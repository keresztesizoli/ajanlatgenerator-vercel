
console.log("Google Maps API init");

function initAutocomplete() {
  const input = document.getElementById("location");
  if (!input) return;

  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.formatted_address) return;
    calculateDistance(place.formatted_address);
  });

  document.getElementById("rate").addEventListener("input", () => {
    const destination = document.getElementById("location").value;
    if (destination) calculateDistance(destination);
  });
}

function calculateDistance(destination) {
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const rate = parseInt(document.getElementById("rate").value) || 150;
  const service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status !== "OK") {
        console.error("Távolság lekérdezés hiba:", status);
        return;
      }
      const distanceInMeters = response.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInMeters / 1000;
      const cost = Math.round((distanceInKm * 2 * rate) / 1000) * 1000;
      document.getElementById("distanceFee").value = cost;
    }
  );
}
