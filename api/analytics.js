import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Initialize the client with service account credentials from env
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const propertyId = process.env.GA_PROPERTY_ID;

export default async function handler(req, res) {
  // Add CORS headers for local development if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!propertyId) {
    return res.status(500).json({ error: 'GA_PROPERTY_ID is not configured' });
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'screenPageViews',
        },
      ],
    });

    // Sum up the metrics for the 7-day period
    let totalUsers = 0;
    let totalViews = 0;

    response.rows.forEach(row => {
      totalUsers += parseInt(row.metricValues[0].value);
      totalViews += parseInt(row.metricValues[1].value);
    });

    return res.status(200).json({
      totalUsers,
      totalViews,
      rows: response.rows,
    });
  } catch (error) {
    console.error('GA4 API Error:', error);
    return res.status(500).json({ error: error.message || "Unknown API Error" });
  }
}
