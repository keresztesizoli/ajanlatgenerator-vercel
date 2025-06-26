console.log("Google Maps API init");

window.addEventListener("DOMContentLoaded", () => {
  const autocompleteEl = document.querySelector("gmpx-placeautocomplete");

  if (autocompleteEl) {
    autocompleteEl.addEventListener("gmpx-placechange", async (e) => {
      const place = e.detail;
      if (place && place.formatted_address) {
        const encoded = encodeURIComponent(place.formatted_address);
        try {
          const res = await fetch(`/api/distance?destination=${encoded}`);
          const data = await res.json();
          if (data.kmFee !== undefined) {
            document.getElementById("travelCost").value = data.kmFee;
          }
        } catch (err) {
          console.error("Hiba a kiszállási díj lekérdezésekor:", err);
        }
      }
    });
  }
});
