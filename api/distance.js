export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const destination = req.query.destination;
  const origin = "2040 Budaörs, Szivárvány utca 3";

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const result = await fetch(url);
    const data = await result.json();
    if (data.status === "OK") {
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInMeters / 1000;
      const cost = Math.round(distanceInKm * 2 * 150 / 1000) * 1000;
      res.status(200).json({ success: true, cost });
    } else {
      res.status(500).json({ success: false, message: data.error_message });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}