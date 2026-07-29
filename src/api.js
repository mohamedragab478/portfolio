/**
 * Centralized API service layer.
 * Replaces all direct Firebase/Firestore calls with REST API calls.
 * 
 * Auth tokens are stored in localStorage and automatically attached
 * to requests that need authentication.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ────────────────────────────────────────────────────────
// Token management
// ────────────────────────────────────────────────────────

export function getToken() {
  return localStorage.getItem('aura_token');
}

export function setToken(token) {
  localStorage.setItem('aura_token', token);
}

export function clearToken() {
  localStorage.removeItem('aura_token');
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  try {
    // Decode JWT payload to check expiry
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// ────────────────────────────────────────────────────────
// HTTP helpers
// ────────────────────────────────────────────────────────

function authHeaders() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: authHeaders(),
    ...options
  });

  if (res.status === 401) {
    clearToken();
    // Optionally redirect to login
    if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
      window.location.href = '/admin/login';
    }
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ────────────────────────────────────────────────────────
// Authentication
// ────────────────────────────────────────────────────────

export async function login(email, password) {
  const data = await request(`${API_BASE}/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  setToken(data.token);
  return data;
}

export function logout() {
  clearToken();
}

// ────────────────────────────────────────────────────────
// Config documents (site_config, portfolioConfig)
// ────────────────────────────────────────────────────────

export async function getConfig(key) {
  return request(`${API_BASE}/config?key=${encodeURIComponent(key)}`);
}

export async function saveConfig(key, data) {
  return request(`${API_BASE}/config?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// ────────────────────────────────────────────────────────
// Collection CRUD (services, skills, projects, etc.)
// ────────────────────────────────────────────────────────

export async function getCollection(name) {
  return request(`${API_BASE}/collection?name=${encodeURIComponent(name)}`);
}

export async function addDocument(collectionName, data) {
  return request(`${API_BASE}/collection?name=${encodeURIComponent(collectionName)}`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateDocument(collectionName, id, data) {
  return request(`${API_BASE}/collection?name=${encodeURIComponent(collectionName)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteDocument(collectionName, id) {
  return request(`${API_BASE}/collection?name=${encodeURIComponent(collectionName)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

// ────────────────────────────────────────────────────────
// Convenience aliases (match old Firebase patterns)
// ────────────────────────────────────────────────────────

// Config shortcuts
export const getHeroConfig = () => getConfig('hero');
export const saveHeroConfig = (data) => saveConfig('hero', data);

export const getAboutConfig = () => getConfig('about');
export const saveAboutConfig = (data) => saveConfig('about', data);

export const getEducationDegree = () => getConfig('educationDegree');
export const saveEducationDegree = (data) => saveConfig('educationDegree', data);

export const getContactRelay = () => getConfig('contactRelay');
export const saveContactRelay = (data) => saveConfig('contactRelay', data);

// Collection shortcuts
export const getServices = () => getCollection('services');
export const addService = (data) => addDocument('services', data);
export const updateService = (id, data) => updateDocument('services', id, data);
export const deleteService = (id) => deleteDocument('services', id);

export const getSkills = () => getCollection('skills');
export const addSkill = (data) => addDocument('skills', data);
export const updateSkill = (id, data) => updateDocument('skills', id, data);
export const deleteSkill = (id) => deleteDocument('skills', id);

export const getProjects = () => getCollection('projects');
export const addProject = (data) => addDocument('projects', data);
export const updateProject = (id, data) => updateDocument('projects', id, data);
export const deleteProject = (id) => deleteDocument('projects', id);

export const getCertifications = () => getCollection('certifications');
export const addCertification = (data) => addDocument('certifications', data);
export const updateCertification = (id, data) => updateDocument('certifications', id, data);
export const deleteCertification = (id) => deleteDocument('certifications', id);

export const getTrainings = () => getCollection('trainings');
export const addTraining = (data) => addDocument('trainings', data);
export const updateTraining = (id, data) => updateDocument('trainings', id, data);
export const deleteTraining = (id) => deleteDocument('trainings', id);

// Training verification (auto-syncs to certifications)
export async function verifyTraining(trainingId, certificateUrl) {
  return request(`${API_BASE}/verify-training`, {
    method: 'POST',
    body: JSON.stringify({ trainingId, certificateUrl })
  });
}

export const getMessages = () => getCollection('messages');
export const addMessage = (data) => addDocument('messages', data);
export const deleteMessage = (id) => deleteDocument('messages', id);
