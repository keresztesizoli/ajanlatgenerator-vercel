
window.initAutocomplete = function () {
  console.log("Google Maps API init");

  const autocompleteElement = document.getElementById("autocompleteElement");
  if (!autocompleteElement) return;

  const autocomplete = new google.maps.places.PlaceAutocompleteElement({ inputElement: autocompleteElement });

  autocomplete.addListener("gmp-placechange", async () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      calculateDistance(place.formatted_address);
    }
  });
};

async function calculateDistance(destination) {
  const response = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
  const data = await response.json();
  if (data.status === "OK") {
    const km = data.distance;
    const kmRate = parseFloat(document.getElementById("kmRate").value);
    const travelFee = Math.ceil((km * 2 * kmRate) / 1000) * 1000;
    document.getElementById("travelFee").value = travelFee;
  }
}

document.getElementById("kmRate").addEventListener("input", () => {
  const place = document.getElementById("autocompleteElement").value;
  if (place) calculateDistance(place);
});

document.getElementById("isHungarian").addEventListener("change", e => {
  const isHu = e.target.value === "yes";
  document.getElementById("nonHungarianOptions").style.display = isHu ? "none" : "block";
  document.getElementById("travelFee").readOnly = !isHu;
});

document.getElementById("nonHungarianChoice").addEventListener("change", e => {
  document.getElementById("customTextLabel").style.display = e.target.value === "defaultText" ? "block" : "none";
});
