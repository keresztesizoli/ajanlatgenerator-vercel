export function initGoogleMaps() {
  console.log("Google Maps API init");
  const autocompleteEl = document.getElementById("autocomplete");
  if (autocompleteEl && window.google && google.maps) {
    autocompleteEl.addEventListener("gmpx-placechange", async (e) => {
      const place = e.target.value;
      if (place) {
        const kmRate = parseFloat(document.getElementById("distanceFee").value);
        try {
          const response = await fetch(`/api/distance?destination=${encodeURIComponent(place)}&rate=${kmRate}`);
          const result = await response.json();
          if (result && result.fee) {
            document.getElementById("finalFee").value = result.fee;
          }
        } catch (error) {
          console.error("Távolság lekérdezési hiba:", error);
        }
      }
    });
  }
}
window.initGoogleMaps = initGoogleMaps;