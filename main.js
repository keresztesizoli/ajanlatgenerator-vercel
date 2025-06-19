let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(document.getElementById("locationInput"));
  autocomplete.addListener("place_changed", calculateDistance);
  console.log("Google Maps API init");
}

function calculateDistance() {
  const destination = document.getElementById("locationInput").value;
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const multiplier = parseFloat(document.getElementById("kmMultiplier").value) || 150;

  fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=AIzaSyC7OZMaGRgCU6jBubYIH4RxW_SoEOtw13Y`)
    .then(r => r.json())
    .then(data => {
      const km = data.rows[0].elements[0].distance.value / 1000;
      const fee = Math.ceil(km * 2 * multiplier / 1000) * 1000;
      document.getElementById("calculatedFee").innerText = fee;
    })
    .catch(() => alert("Hiba történt a távolság lekérdezésekor"));
}

function generatePDF() {
  alert("PDF generálás itt történne.");
}
