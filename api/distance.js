export default function handler(req, res) {
    const { destination } = req.query;
    if (!destination) {
        return res.status(400).json({ error: "No destination provided" });
    }

    const mockDistanceMeters = 58200; // pl. 58,2 km
    res.status(200).json({
        status: "OK",
        distance_meters: mockDistanceMeters
    });
}