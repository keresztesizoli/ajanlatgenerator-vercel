
function initAutocomplete() {
  console.log("Google Maps API init");
  const locationInput = document.getElementById("location");
  if (!locationInput) return;

  const autocomplete = new google.maps.places.Autocomplete(locationInput, {
    types: ["geocode"],
    componentRestrictions: { country: "hu" },
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.formatted_address) {
      fetch(`/api/distance?destination=${encodeURIComponent(place.formatted_address)}`)
        .then(res => res.json())
        .then(data => {
          if (data.distance_km && data.rate) {
            const price = Math.round(data.distance_km * data.rate / 1000) * 1000;
            document.getElementById("price").value = price;
          }
        })
        .catch(err => {
          console.error("Hiba a távolság lekérdezésnél:", err);
        });
    }
  });

  const rateInput = document.getElementById("rate");
  rateInput.addEventListener("input", () => {
    const event = new Event("place_changed");
    autocomplete.dispatchEvent(event);
  });
}

function generatePDF() {
  alert("PDF-generálás itt történne.");
}
