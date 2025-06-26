
export default async function handler(req, res) {
  const { destination } = req.query;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const element = data.rows[0].elements[0];
      if (element.status === "OK") {
        const distance = element.distance.value;
        res.status(200).json({ distance });
      } else {
        res.status(500).json({ error: element.status });
      }
    } else {
      res.status(500).json({ error: data.status });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
