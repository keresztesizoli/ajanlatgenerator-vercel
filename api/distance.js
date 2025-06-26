
export default async function handler(req, res) {
  const destination = req.query.destination;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  if (!destination || !apiKey) {
    return res.status(400).json({ error: "Hiányzó paraméter" });
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const distanceMeters = data.rows[0].elements[0].distance.value;
    const distanceKm = distanceMeters / 1000;

    res.status(200).json({ distance_km: distanceKm, rate: 150 });
  } catch (err) {
    res.status(500).json({ error: "Távolság számítás hiba", details: err.message });
  }
}
