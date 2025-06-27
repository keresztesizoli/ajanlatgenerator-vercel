export default async function handler(req, res) {
  const { destination, rate } = req.query;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK" || !data.rows[0].elements[0].distance) {
    return res.status(500).json({ error: "Távolság nem elérhető" });
  }

  const distanceInMeters = data.rows[0].elements[0].distance.value;
  const distanceInKm = Math.ceil(distanceInMeters / 1000);
  const fee = Math.ceil(distanceInKm * parseFloat(rate || 150) / 1000) * 1000;
  return res.status(200).json({ distance: distanceInKm, fee });
}