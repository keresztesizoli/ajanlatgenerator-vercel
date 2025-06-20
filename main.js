console.log("Google Maps API init");

function initAutocomplete() {
  const locationInput = document.getElementById("location");
  if (!locationInput) return;

  const autocomplete = new google.maps.places.Autocomplete(locationInput);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.formatted_address) {
      fetch(`/api/distance?destination=${encodeURIComponent(place.formatted_address)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            document.getElementById("distance-cost").value = data.cost + " Ft";
          } else {
            alert("Nem sikerült kiszámítani a távolságot.");
          }
        })
        .catch(err => {
          console.error("Távolság lekérdezés hiba:", err);
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("offer-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("PDF generálás funkció itt fog működni.");
  });
});