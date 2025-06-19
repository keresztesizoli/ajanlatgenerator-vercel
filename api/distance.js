const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const destination = req.query.destination;
  if (!destination) {
    return res.status(400).json({ error: "Hiányzó paraméter: destination" });
  }

  const origin = "2040 Budaörs, Szivárvány utca 3";
  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const distanceMeters = data.rows?.[0]?.elements?.[0]?.distance?.value;
    if (!distanceMeters) throw new Error("Nincs elérhető távolságadat");

    const distanceKm = distanceMeters / 1000;
    const price = Math.round(distanceKm * 2 * 150 / 1000) * 1000;

    res.status(200).json({
      distance_km: Math.round(distanceKm),
      price_huf: price
    });
  } catch (err) {
    console.error("Hiba a Distance Matrix API-nál:", err);
    res.status(500).json({ error: "Hiba történt a távolság lekérdezésekor." });
  }
};