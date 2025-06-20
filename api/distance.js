
export default async function handler(req, res) {
  const { destination } = req.query;

  if (!destination) {
    return res.status(400).json({ error: 'Destination is required' });
  }

  const origin = '2040 Budaörs, Szivárvány utca 3';
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found in environment variables' });
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.rows || data.rows.length === 0) {
      console.error('Distance API error:', data);
      return res.status(500).json({ error: 'Failed to calculate distance' });
    }

    const distanceInMeters = data.rows[0].elements[0].distance.value;
    const distanceInKm = distanceInMeters / 1000;

    res.status(200).json({ distance: distanceInKm });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
