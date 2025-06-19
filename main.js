function initAutocomplete() {
  const input = document.getElementById('destination');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.formatted_address) return;
    calculateDistance(place.formatted_address);
  });
}
window.initAutocomplete = initAutocomplete;

async function calculateDistance(destination) {
  try {
    const response = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
    const data = await response.json();
    if (data.distance && data.distance.value) {
      const km = data.distance.value / 1000;
      const price = Math.round((km * 150) / 1000) * 1000;
      document.getElementById("price").value = price;
    }
  } catch (error) {
    console.error("Távolság lekérdezés hiba:", error);
  }
}

function generatePDF() {
  const doc = new window.jspdf.jsPDF();
  const destination = document.getElementById("destination").value;
  const price = document.getElementById("price").value;
  doc.text(`Helyszín: ${destination}`, 10, 10);
  doc.text(`Számított km-díj: ${price} Ft`, 10, 20);
  doc.save("ajanlat.pdf");
}
