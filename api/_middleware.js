/**
 * Middleware helpers for Vercel serverless API routes.
 * Provides JWT verification, CORS handling, and error wrapping.
 */
import jwt from 'jsonwebtoken';
import { parseCookie } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-aura-jwt-secret-key-32-chars-long';
export const ACTUAL_JWT_SECRET = JWT_SECRET;

/**
 * Set standard CORS headers on the response.
 */
export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
}

/**
 * Handle OPTIONS preflight requests.
 * @returns {boolean} true if it was a preflight and was handled.
 */
export function handlePreflight(req, res) {
  if (req.method === 'OPTIONS') {
    setCors(res);
    res.status(204).end();
    return true;
  }
  return false;
}

/**
 * Verify JWT token from candidate sources (Authorization header, x-auth-token, cookies).
 * @returns {object|null} decoded token payload or null if invalid.
 */
export function verifyToken(req) {
  const candidateTokens = [];

  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    candidateTokens.push(authHeader.split(' ')[1]);
  }

  const xAuthToken = req?.headers?.['x-auth-token'];
  if (xAuthToken) {
    candidateTokens.push(xAuthToken);
  }

  if (req?.headers?.cookie) {
    try {
      const cookies = parseCookie(req.headers.cookie);
      if (cookies.aura_token) candidateTokens.push(cookies.aura_token);
      if (cookies.token) candidateTokens.push(cookies.token);
    } catch (e) {
      console.error('Error parsing cookie:', e);
    }
  }

  for (const token of candidateTokens) {
    if (!token) continue;
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      if (payload) return payload;
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

/**
 * Require authentication — returns 401 if token is invalid.
 * @returns {object|null} decoded payload or null (response already sent).
 */
export function requireAuth(req, res) {
  const payload = verifyToken(req);
  if (!payload) {
    res.status(401).json({ success: false, error: 'Unauthorized: Invalid or missing authentication token' });
    return null;
  }
  return payload;
}

