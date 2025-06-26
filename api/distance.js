
export default async function handler(request, response) {
  const destination = request.query.destination;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK") {
    const meters = data.rows[0].elements[0].distance.value;
    const km = meters / 1000;
    response.status(200).json({ distance_km: km });
  } else {
    response.status(500).json({ error: data.error_message || "Distance API error" });
  }
}
