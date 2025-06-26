
console.log("Google Maps API init");

function initAutocomplete() {
  const input = document.getElementById("locationInput");
  if (!input) return;

  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      fetch(`/api/distance?destination=${encodeURIComponent(place.formatted_address)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.kmFee !== undefined) {
            document.getElementById("travelCost").value = data.kmFee;
          }
        });
    }
  });
}

document.getElementById("isHungary").addEventListener("change", (e) => {
  const intl = document.getElementById("internationalOptions");
  intl.style.display = e.target.value === "nem" ? "block" : "none";
});

document.getElementById("kmRate").addEventListener("input", () => {
  document.getElementById("locationInput").dispatchEvent(new Event("blur"));
});

function generatePDF() {
  alert("PDF generálása most még nem aktív.");
}
