import { setCors, handlePreflight } from './_middleware.js';
import collectionHandler from './_handlers/collection.js';
import chatHandler from './_handlers/chat.js';
import settingsHandler from './_handlers/settings.js';
import projectsHandler from './_handlers/projects.js';
import skillsHandler from './_handlers/skills.js';
import certificatesHandler from './_handlers/certificates.js';
import configHandler from './_handlers/config.js';
import analyticsHandler from './_handlers/analytics.js';
import authHandler from './_handlers/auth.js';
import verifyTrainingHandler from './_handlers/verify-training.js';

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/^\/api\/?/, '');
  const cleanPath = pathname.split('?')[0].replace(/\/$/, '');

  if (cleanPath === 'chat') return chatHandler(req, res);
  if (cleanPath === 'settings') return settingsHandler(req, res);
  if (cleanPath === 'projects') return projectsHandler(req, res);
  if (cleanPath === 'skills') return skillsHandler(req, res);
  if (cleanPath === 'certificates') return certificatesHandler(req, res);
  if (cleanPath === 'config') return configHandler(req, res);
  if (cleanPath === 'analytics') return analyticsHandler(req, res);
  if (cleanPath === 'auth' || cleanPath.startsWith('auth/')) return authHandler(req, res);
  if (cleanPath === 'verify-training') return verifyTrainingHandler(req, res);
  
  // Default collection / CRUD handler
  return collectionHandler(req, res);
}
