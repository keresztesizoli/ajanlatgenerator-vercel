
export default async function handler(req, res) {
  const destination = req.query.destination;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const key = process.env.GOOGLE_MAPS_SERVER_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${key}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
    const meters = data.rows[0].elements[0].distance.value;
    const kilometers = Math.round(meters / 1000);
    res.status(200).json({ status: "OK", distance: kilometers });
  } else {
    res.status(500).json({ status: "ERROR", message: data.error_message || "Távolság lekérés sikertelen" });
  }
}
