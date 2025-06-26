
console.log("Google Maps API init");

function initAutocomplete() {
  const input = document.getElementById("location");
  if (!input) return;

  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(["geometry", "formatted_address"]);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    const destination = place.formatted_address;
    const kmRate = parseInt(document.getElementById("km-rate").value) || 150;
    fetch(`/api/distance?destination=${encodeURIComponent(destination)}&rate=${kmRate}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          document.getElementById("travel-cost").value = data.cost;
        }
      });
  });
}

document.getElementById("is-hungary").addEventListener("change", e => {
  const abroad = e.target.value === "no";
  document.getElementById("abroad-options").style.display = abroad ? "block" : "none";
});
