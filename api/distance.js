
// Használat esetén a backend oldalon kell lennie
const axios = require('axios');

module.exports = async (req, res) => {
  const destination = req.query.destination;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const origin = "2040 Budaörs, Szivárvány utca 3";

  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
      params: {
        origins: origin,
        destinations: destination,
        key: apiKey
      }
    });

    const distanceMeters = response.data.rows[0].elements[0].distance.value;
    const distanceKm = distanceMeters / 1000;
    res.status(200).json({ distanceKm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Távolság számítási hiba." });
  }
};
