
console.log("Google Maps API init");

function initAutocomplete() {
  const input = document.getElementById("location");
  if (!input) return;

  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.formatted_address) {
      calculateDistance(place.formatted_address);
    }
  });
}

async function calculateDistance(destination) {
  const multiplier = parseFloat(document.getElementById("multiplier").value) || 150;
  try {
    const res = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
    const data = await res.json();
    if (data.distance) {
      const fee = Math.round(data.distance * 2 * multiplier / 1000) * 1000;
      document.getElementById("fee").value = fee.toString();
    } else {
      document.getElementById("fee").value = "Hiba";
    }
  } catch (err) {
    console.error("Távolság lekérdezés hiba:", err);
    document.getElementById("fee").value = "Hiba";
  }
}
