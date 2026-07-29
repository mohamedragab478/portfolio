import jwt from 'jsonwebtoken';
import { stringifySetCookie } from 'cookie';
import { setCors, handlePreflight } from '../_middleware.js';

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || '').trim().toLowerCase();
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-aura-jwt-secret-key-32-chars-long';

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required',
      });
    }

    const inputUser = username.trim().toLowerCase();

    // Accepted usernames/emails in env & defaults
    const validUsernames = [
      ADMIN_USERNAME,
      ADMIN_EMAIL,
      'admin',
      'admin@aura.dev',
      'amir@pro.dev',
      'amir',
    ].filter(Boolean);

    const isUsernameValid = validUsernames.includes(inputUser);
    const isPasswordValid = password === ADMIN_PASSWORD;

    if (!isUsernameValid || !isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password',
      });
    }

    // Sign 24h JWT token
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Serialize HttpOnly, Secure, SameSite=Strict cookie
    const isProduction = process.env.NODE_ENV === 'production';
    const serializedCookie = stringifySetCookie({
      name: 'aura_token',
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'Strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    res.setHeader('Set-Cookie', serializedCookie);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: { username: ADMIN_USERNAME, role: 'admin' },
    });
  } catch (error) {
    console.error('Login Endpoint Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
