/**
 * POST /api/verify-training
 * 
 * Verifies a training record by marking it as completed and optionally
 * syncing it to the certifications collection.
 * 
 * Body: { trainingId, certificateUrl? }
 * Response: { success: true, training, certification? }
 * 
 * Auth required.
 */
import mongoose from 'mongoose';
import { connectDb } from '../_db.js';
import { setCors, handlePreflight, requireAuth } from '../_middleware.js';
import Training from '../models/Training.js';
import Certification from '../models/Certification.js';

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  try {
    const { trainingId, certificateUrl } = req.body;

    if (!trainingId) {
      return res.status(400).json({ error: 'Missing "trainingId" in request body.' });
    }

    if (!mongoose.Types.ObjectId.isValid(trainingId)) {
      return res.status(400).json({ error: 'Invalid "trainingId" format.' });
    }

    await connectDb();

    // Find the training record
    const training = await Training.findById(trainingId);
    if (!training) {
      return res.status(404).json({ error: 'Training record not found.' });
    }

    // Mark training as completed and verified
    training.isCompleted = true;
    training.verifiedAt = new Date();
    training.status = 'Verified & Completed';
    if (certificateUrl) {
      training.certificateUrl = certificateUrl;
    }
    await training.save();

    // Auto-sync to certifications collection
    // Check if a certification already exists for this training
    const existingCert = await Certification.findOne({ title: training.title, issuer: training.provider });
    
    let certification = null;
    if (!existingCert) {
      certification = await Certification.create({
        title: training.title,
        issuer: training.provider,
        date: new Date().toISOString(),
        credentialUrl: training.certificateUrl || '',
        skills: training.skillsListed || [],
      });
    } else {
      // Update existing certification with latest data
      existingCert.credentialUrl = training.certificateUrl || existingCert.credentialUrl;
      existingCert.skills = training.skillsListed || existingCert.skills;
      await existingCert.save();
      certification = existingCert;
    }

    return res.status(200).json({
      success: true,
      training: training.toJSON(),
      certification: certification.toJSON(),
    });
  } catch (error) {
    console.error('Verify-training error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
