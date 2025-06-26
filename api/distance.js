
export default async function handler(req, res) {
  const { destination } = req.query;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const key = process.env.GOOGLE_MAPS_SERVER_KEY;

  if (!key) {
    return res.status(500).json({ error: "API key missing" });
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (
      data.status === "OK" &&
      data.rows[0]?.elements[0]?.status === "OK"
    ) {
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      const distanceKm = distanceInMeters / 1000;
      const kmRate = 150;
      const fee = Math.round(distanceKm * 2 * kmRate / 1000) * 1000;

      res.status(200).json({ km: distanceKm, kmFee: fee });
    } else {
      res.status(500).json({ error: "API response invalid", data });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
