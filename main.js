
console.log("Google Maps API init");

function initAutocomplete() {
  const input = document.getElementById("location");
  if (!input) return;
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", async () => {
    const place = autocomplete.getPlace();
    if (!place.formatted_address) return;
    try {
      const response = await fetch(`/api/distance?destination=${encodeURIComponent(place.formatted_address)}`);
      const data = await response.json();
      if (data && data.distanceKm) {
        const fee = Math.round(data.distanceKm * 2 * 150 / 1000) * 1000;
        document.getElementById("fee").value = fee;
      } else {
        document.getElementById("fee").value = "Nem elérhető";
      }
    } catch (error) {
      console.error("Távolság lekérdezés hiba:", error);
      document.getElementById("fee").value = "Hiba";
    }
  });
}
