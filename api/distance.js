// api/distance.js

export default async function handler(req, res) {
  const origin = '2040 Budaörs, Szivárvány utca 3';
  const destination = req.query.destination;

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Google API kulcs hiányzik.' });
  }

  if (!destination) {
    return res.status(400).json({ error: 'Célállomás nem megadott.' });
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google API válasz hiba:', data);
      return res.status(500).json({ error: 'A Google API nem adott érvényes választ.', details: data });
    }

    const elements = data.rows?.[0]?.elements?.[0];
    if (!elements || elements.status !== 'OK') {
      console.error('Távolságadat nem érkezett:', elements);
      return res.status(500).json({ error: 'Távolságadat nem érkezett.' });
    }

    const distanceMeters = elements.distance.value;
    const distanceKm = distanceMeters / 1000;
    const roundedKm = Math.round(distanceKm * 2); // oda-vissza
    res.status(200).json({ distanceKm: roundedKm });

  } catch (error) {
    console.error('Távolság lekérdezés hiba:', error);
    res.status(500).json({ error: 'Hálózati vagy kiszolgálói hiba történt.', details: error.message });
  }
}
