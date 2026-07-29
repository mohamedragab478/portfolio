import { connectDb } from './_utils/mongodb.js';
import Skill from './models/Skill.js';
import { setCors, handlePreflight } from './_middleware.js';
import { verifyAuth } from './_utils/auth.js';

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  try {
    // GET requests are public
    if (req.method === 'GET') {
      await connectDb();
      const skills = await Skill.find({}).sort({ importance: -1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        data: skills,
      });
    }

    // Enforce authentication for mutation endpoints (POST, PUT, DELETE)
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      if (!verifyAuth(req, res)) return;
      await connectDb();
    }

    if (req.method === 'POST') {
      const newSkill = await Skill.create(req.body);
      return res.status(201).json({
        success: true,
        data: newSkill,
      });
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Missing document id parameter' });
      }
      const updated = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Skill document not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Missing document id parameter' });
      }
      const deleted = await Skill.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Skill document not found' });
      }
      return res.status(200).json({ success: true, data: deleted });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('API Error (/api/skills):', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
