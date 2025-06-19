
function calculateDistance() {
    const location = document.getElementById('location').value;
    const rate = parseFloat(document.getElementById('rate').value);
    fetch(`/api/distance?destination=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
            if (data.distance_km) {
                const fee = Math.round(data.distance_km * 2 * rate / 1000) * 1000;
                document.getElementById('distanceFee').value = fee.toLocaleString('hu-HU') + " Ft";
            } else {
                document.getElementById('distanceFee').value = "Hiba a számításnál";
            }
        });
}
