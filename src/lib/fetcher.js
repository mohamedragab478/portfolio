/**
 * Reusable SWR fetcher utility handling API requests, 401 redirects, and error states.
 * 
 * @param {string} url - API endpoint URL to fetch.
 * @returns {Promise<any>} - Resolves to the data property or parsed JSON.
 */
export const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.error || errorData.message || `An error occurred while fetching: HTTP ${res.status}`);
    error.status = res.status;
    error.info = errorData;

    // Security Handling: If any API request returns 401 Unauthorized, auto-redirect to Admin Login
    if (res.status === 401 && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }

    throw error;
  }

  const json = await res.json();
  // Automatically unwrap standard { success: true, data: [...] } responses
  if (json && typeof json === 'object' && 'success' in json && 'data' in json) {
    return json.data;
  }

  return json;
};

export default fetcher;
