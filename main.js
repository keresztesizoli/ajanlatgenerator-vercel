function initAutocomplete() {
  console.log("Google Maps API init");
  const input = document.getElementById("autocomplete");
  const autocomplete = new google.maps.places.Autocomplete(input, {
    componentRestrictions: { country: "hu" }
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      calculateDistance(place.formatted_address);
    }
  });
}

function calculateDistance(destination) {
  const rate = parseInt(document.getElementById("rate").value, 10);
  const origin = "2040 Budaörs, Szivárvány utca 3";
  fetch(`/api/distance?destination=${encodeURIComponent(destination)}`)
    .then(response => response.json())
    .then(data => {
      if (data.distance_km !== undefined) {
        const total = Math.round(data.distance_km * 2 * rate / 1000) * 1000;
        document.getElementById("total").value = total;
      }
    })
    .catch(error => {
      console.error("Távolság hiba:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const isDomestic = document.getElementById("isDomestic");
  const abroadOptions = document.getElementById("abroadOptions");
  const abroadOption = document.getElementById("abroadOption");
  const customTextLabel = document.getElementById("customTextLabel");

  isDomestic.addEventListener("change", () => {
    abroadOptions.style.display = isDomestic.value === "nem" ? "block" : "none";
  });

  abroadOption.addEventListener("change", () => {
    customTextLabel.style.display = abroadOption.value === "egyedi" ? "block" : "none";
  });

  const hourSelect = document.getElementById("hour");
  for (let i = 0; i < 24; i++) {
    const option = document.createElement("option");
    option.value = option.text = String(i).padStart(2, "0");
    hourSelect.appendChild(option);
  }
});

function generatePDF() {
  alert("PDF generálás funkció még nincs implementálva.");
}
