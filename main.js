console.log("Google Maps API init");

let autocomplete;

function autocompleteInit() {
  const input = document.getElementById("location");
  if (!input) return;
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", calculateDistance);
}

function calculateDistance() {
  const location = document.getElementById("location").value;
  if (!location) return;

  fetch(`/api/distance?destination=${encodeURIComponent(location)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.distance_km && data.price_huf) {
        document.getElementById("distancePrice").value = `${data.price_huf} Ft (${data.distance_km} km)`;
      } else {
        console.error("Érvénytelen válasz:", data);
      }
    })
    .catch(err => {
      console.error("Távolság lekérdezés hiba:", err);
    });
}