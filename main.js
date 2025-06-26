
console.log("Google Maps API init");

let autocomplete;
function initAutocomplete() {
  const input = document.getElementById("autocomplete");
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", calculateDistance);
}

async function calculateDistance() {
  const destination = document.getElementById("autocomplete").value;
  const kmPrice = parseFloat(document.getElementById("kmPrice").value);
  if (!destination || !kmPrice) return;

  const response = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
  const data = await response.json();

  if (data.status === "OK") {
    const km = data.distance;
    const total = Math.round(km * kmPrice / 1000) * 1000;
    document.getElementById("distancePrice").value = total;
  } else {
    document.getElementById("distancePrice").value = "Hiba";
  }
}

// km-díj változásra is újraszámolás
document.getElementById("kmPrice").addEventListener("input", calculateDistance);
document.getElementById("autocomplete").addEventListener("change", calculateDistance);

// Magyarországi? beállítás logika
document.getElementById("isDomestic").addEventListener("change", function() {
  const val = this.value;
  const box = document.getElementById("distanceOptions");
  box.style.display = (val === "nem") ? "block" : "none";
});

// Egyedi szöveg megjelenítése
document.getElementById("internationalMode").addEventListener("change", function() {
  const customBox = document.getElementById("customTextDiv");
  customBox.style.display = this.value === "egyedi" ? "block" : "none";
});

function generatePDF() {
  alert("PDF generálás ide kerül majd...");
}
