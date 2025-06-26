
console.log("Google Maps API init");

let autocomplete;

function initAutocomplete() {
  const input = document.getElementById("location");
  if (!input) return;

  autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"]
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    calculateDistance(place.formatted_address);
  });
}

function calculateDistance(destination) {
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const kmRate = parseInt(document.getElementById("kmRate").value) || 150;

  fetch(`/api/distance?destination=${encodeURIComponent(destination)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.distanceKm) {
        const cost = Math.round(data.distanceKm * 2 * kmRate / 1000) * 1000;
        document.getElementById("travelCost").value = cost;
      } else {
        console.error("No distance returned");
      }
    })
    .catch((err) => {
      console.error("Távolság lekérdezés hiba:", err);
    });
}

document.getElementById("kmRate").addEventListener("input", () => {
  const loc = document.getElementById("location").value;
  if (loc) calculateDistance(loc);
});
