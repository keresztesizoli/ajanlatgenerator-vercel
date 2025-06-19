window.addEventListener('DOMContentLoaded', () => {
  console.log("Google Maps API init");

  const helyszinInput = document.getElementById('helyszin');
  const szorzoInput = document.getElementById('szorzo');
  const dijInput = document.getElementById('dij');

  const autocomplete = new google.maps.places.Autocomplete(helyszinInput);
  autocomplete.addListener("place_changed", async () => {
    const place = autocomplete.getPlace();
    if (!place.formatted_address) return;
    const destination = place.formatted_address;
    try {
      const response = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
      const data = await response.json();
      const distanceKm = data.distance;
      const szorzo = parseInt(szorzoInput.value) || 150;
      const dij = Math.round(distanceKm * 2 * szorzo / 1000) * 1000;
      dijInput.value = dij;
    } catch (error) {
      console.error("Hiba a távolság lekérdezésnél:", error);
    }
  });

  document.getElementById('generatePDF').addEventListener('click', () => {
    alert("PDF generálás későbbi lépés.");
  });
});
