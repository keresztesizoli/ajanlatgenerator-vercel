
document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("location");
    const calculatedFeeInput = document.getElementById("calculatedFee");
    const pricePerKmInput = document.getElementById("pricePerKm");
    const customFeeInput = document.getElementById("customFee");

    if (window.google) {
        const autocomplete = new google.maps.places.Autocomplete(locationInput);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            const destination = place.formatted_address || place.name;

            fetch(`/api/distance?destination=${encodeURIComponent(destination)}`)
                .then(res => res.json())
                .then(data => {
                    const distanceKm = data.distance_km;
                    const pricePerKm = parseInt(pricePerKmInput.value || "150", 10);
                    const fee = Math.ceil(distanceKm * pricePerKm / 1000) * 1000;
                    calculatedFeeInput.value = fee;
                    if (!customFeeInput.value) customFeeInput.value = fee;
                })
                .catch(err => {
                    console.error("Távolság lekérdezés hiba:", err);
                    calculatedFeeInput.value = "";
                });
        });
    }

    document.getElementById("offer-form").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("PDF generálás még nem implementált.");
    });
});
