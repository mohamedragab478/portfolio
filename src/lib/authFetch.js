/**
 * Unified authenticated fetch wrapper.
 * Automatically attaches credentials: 'include' and Bearer Authorization headers.
 * 
 * @param {string} url - Target URL or endpoint path
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} Fetch Response object
 */
export async function authFetch(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Retrieve token from localStorage if available
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem('aura_token') : null;
  if (storedToken && !headers['Authorization'] && !headers['authorization']) {
    headers['Authorization'] = `Bearer ${storedToken}`;
    headers['x-auth-token'] = storedToken;
  }

  const mergedOptions = {
    ...options,
    credentials: 'include',
    headers,
  };

  const res = await fetch(url, mergedOptions);

  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('aura_token');
    document.cookie = 'aura_token=; Max-Age=0; path=/;';
    if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
      window.location.href = '/admin/login';
    }
  }

  return res;
}

export default authFetch;
