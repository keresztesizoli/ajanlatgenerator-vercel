
console.log("Google Maps API init");

function initAutocomplete() {
  const input = document.getElementById("location-input");
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.formatted_address) return;
    const destination = place.formatted_address;

    const url = `/api/distance?destination=${encodeURIComponent(destination)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.distanceKm) {
          const multiplier = parseInt(document.getElementById("km-multiplier").value) || 150;
          const fee = Math.round((data.distanceKm * 2 * multiplier) / 1000) * 1000;
          document.getElementById("calculated-fee").value = fee;
        }
      })
      .catch((err) => console.error("Távolság lekérdezés hiba:", err));
  });
}

function generatePDF() {
  const element = document.getElementById("form-container");
  const opt = {
    margin: 0.5,
    filename: "ajanlat.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };
  html2pdf().set(opt).from(element).save();
}
