
console.log("Google Maps API init");

window.initAutocomplete = function () {
  const input = document.getElementById("helyszin");
  if (!input) return;
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (!place.formatted_address) return;
    calculateDistance(place.formatted_address);
  });
};

function calculateDistance(destination) {
  const base = "2040 Budaörs, Szivárvány utca 3";
  const kmRate = parseInt(document.getElementById("alapdij").value) || 150;

  fetch(`/api/distance?destination=${encodeURIComponent(destination)}`)
    .then(res => res.json())
    .then(data => {
      const distanceKm = data.distance_km;
      let price = Math.round(distanceKm * 2 * kmRate / 1000) * 1000;
      document.getElementById("dij").value = price;
    })
    .catch(err => {
      console.error("Távolság lekérdezés hiba:", err);
    });
}

function generatePDF() {
  window.print();
}
