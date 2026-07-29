/**
 * POST /api/auth   — Login with email + password, return JWT.
 * 
 * Body: { email, password }
 * Response: { token, user: { email } }
 * 
 * On first call, if no admin user exists in the database, it auto-seeds one
 * using ADMIN_EMAIL and ADMIN_PASSWORD env vars.
 * 
 * Uses Mongoose AdminUser model.
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDb } from '../_db.js';
import { ACTUAL_JWT_SECRET, setCors, handlePreflight } from '../_middleware.js';
import AdminUser from '../models/AdminUser.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@aura.dev';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    await connectDb();

    // Auto-seed admin user if collection is empty
    const userCount = await AdminUser.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await AdminUser.create({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`Admin user seeded: ${ADMIN_EMAIL}`);
    }

    // Find user (select +password since schema toJSON strips it)
    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Sign JWT (24h expiry)
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      ACTUAL_JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      token,
      user: { email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
