console.log("Google Maps API init");

let autocomplete;

function initAutocomplete() {
  const locationInput = document.getElementById("location");
  autocomplete = new google.maps.places.Autocomplete(locationInput, { types: ['geocode'] });

  autocomplete.addListener("place_changed", async () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      const destination = place.formatted_address;
      try {
        const res = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
        const data = await res.json();
        if (data.price) {
          document.getElementById("price").value = data.price;
        }
      } catch (err) {
        console.error("Távolság lekérdezés hiba:", err);
      }
    }
  });
}

async function generatePDF() {
  const form = document.getElementById("offerForm");
  const pdf = new window.jspdf.jsPDF();
  await html2canvas(form).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("ajanlat.pdf");
  });
}
