/**
 * GET  /api/config?key=hero         — Public read of a config document.
 * POST /api/config?key=hero         — Admin-only write/update of a config document.
 *
 * Uses Mongoose SiteConfig model with upsert semantics.
 * Each config document is stored with a unique `key` field.
 */
import { connectDb } from './_db.js';
import { setCors, handlePreflight, requireAuth } from '../_middleware.js';
import SiteConfig from '../models/SiteConfig.js';

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: 'Missing "key" query parameter.' });
  }

  await connectDb();

  try {
    if (req.method === 'GET') {
      const doc = await SiteConfig.findOne({ key }).lean();
      return res.status(200).json(doc ? doc.data : {});
    }

    if (req.method === 'POST') {
      if (!requireAuth(req, res)) return;

      const data = req.body;
      await SiteConfig.findOneAndUpdate(
        { key },
        { key, data },
        { upsert: true, new: true, runValidators: true }
      );
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(`Config API error (key=${key}):`, error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
