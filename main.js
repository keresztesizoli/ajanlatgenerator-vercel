
console.log("Google Maps API init");

function initAutocomplete() {
  const input = document.getElementById("autocomplete");
  if (!input) return;
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      alert("Hely nem található.");
      return;
    }
    const destination = place.formatted_address;
    calculateDistance(destination);
  });
}

async function calculateDistance(destination) {
  const response = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
  if (!response.ok) {
    console.error("Távolság lekérdezés hiba:", await response.text());
    return;
  }
  const data = await response.json();
  if (data.distance) {
    const km = data.distance;
    const rate = parseInt(document.getElementById("kmRate").value || "150", 10);
    const cost = Math.ceil(km * 2 * rate / 1000) * 1000;
    document.getElementById("travelCost").value = cost;
  }
}

document.getElementById("kmRate").addEventListener("input", () => {
  const destination = document.getElementById("autocomplete").value;
  if (destination) calculateDistance(destination);
});
