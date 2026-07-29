import { connectDb } from '../_utils/mongodb.js';
import mongoose from 'mongoose';
import { setCors, handlePreflight } from '../_middleware.js';
import { verifyAuth } from '../_utils/auth.js';

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  try {
    await connectDb();
    const db = mongoose.connection.db;
    const collection = db.collection('settings');

    // GET requests are public
    if (req.method === 'GET') {
      const docs = await collection.find({}).sort({ updatedAt: -1 }).toArray();
      const formatted = docs.map(doc => {
        const copy = { ...doc, id: doc._id.toString() };
        delete copy._id;
        delete copy.__v;
        return copy;
      });
      return res.status(200).json({
        success: true,
        data: formatted,
      });
    }

    // Enforce authentication for mutation endpoints (POST, PUT, DELETE)
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      if (!verifyAuth(req, res)) return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = { ...req.body };
      if (payload.profileImageUrl) payload.heroImage = payload.profileImageUrl;
      if (payload.heroImage && !payload.profileImageUrl) payload.profileImageUrl = payload.heroImage;

      const existing = await collection.findOne({});
      let docId;

      if (existing) {
        docId = existing._id;
        await collection.updateOne(
          { _id: docId },
          { 
            $set: {
              ...payload,
              updatedAt: new Date()
            } 
          }
        );
      } else {
        const result = await collection.insertOne({
          ...payload,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        docId = result.insertedId;
      }

      const updatedDoc = await collection.findOne({ _id: docId });
      const copy = { ...updatedDoc, id: updatedDoc._id.toString() };
      delete copy._id;
      delete copy.__v;

      return res.status(200).json({
        success: true,
        data: copy,
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
        const { ObjectId } = mongoose.Types;
        await collection.deleteOne({ _id: new ObjectId(id) });
      } else {
        await collection.deleteMany({});
      }
      return res.status(200).json({ success: true, message: 'Settings deleted' });
    }

    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`,
    });
  } catch (error) {
    console.error('Settings API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
}
