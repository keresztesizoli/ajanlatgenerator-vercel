
export default async function handler(req, res) {
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const destination = req.query.destination;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (
      data.rows &&
      data.rows[0] &&
      data.rows[0].elements &&
      data.rows[0].elements[0].distance
    ) {
      const distanceMeters = data.rows[0].elements[0].distance.value;
      res.status(200).json({ distance_km: distanceMeters / 1000 });
    } else {
      res.status(500).json({ error: "Distance not found in response." });
    }
  } catch (error) {
    res.status(500).json({ error: "API call failed." });
  }
}
