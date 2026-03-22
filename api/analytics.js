import { BetaAnalyticsDataClient } from '@google-analytics/data';

export default async function handler(req, res) {
  // 1. CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // 2. Fetch raw environment variables
    const rawPropertyId = process.env.GA_PROPERTY_ID || '';
    const rawEmail = process.env.GA_CLIENT_EMAIL || '';
    const rawPrivateKey = process.env.GA_PRIVATE_KEY || '';

    if (!rawPropertyId || !rawEmail || !rawPrivateKey) {
      throw new Error("Missing Google Analytics Environment Variables.");
    }

    // 3. Rigorous sanitization (Remove extra quotes and fix newlines)
    const cleanPropertyId = rawPropertyId.replace(/"/g, '').trim();
    const cleanEmail = rawEmail.replace(/"/g, '').trim();
    const cleanPrivateKey = rawPrivateKey.replace(/"/g, '').replace(/\\n/g, '\n');

    // 4. Initialize GA4 Client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: cleanEmail,
        private_key: cleanPrivateKey,
      }
    });

    // 5. Fetch Data
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${cleanPropertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
    });

    // 6. Return Data
    return res.status(200).json(response);

  } catch (error) {
    console.error('GA4 API Execution Error:', error);
    return res.status(500).json({ 
      error: "GA4 API Error", 
      details: error.message 
    });
  }
}
