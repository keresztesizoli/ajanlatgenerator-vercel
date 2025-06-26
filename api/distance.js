export default async function handler(req, res) {
  const destination = req.query.destination;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.rows?.[0]?.elements?.[0]?.distance?.value) {
      const meters = data.rows[0].elements[0].distance.value;
      const km = meters / 1000;
      const price = Math.ceil(km * 2 * 150 / 1000) * 1000;
      res.status(200).json({ distance: km, price });
    } else {
      throw new Error("Érvénytelen válasz a Google API-tól");
    }
  } catch (error) {
    console.error("Távolság lekérdezés hiba:", error);
    res.status(500).json({ error: "Távolság számítás hiba" });
  }
}
