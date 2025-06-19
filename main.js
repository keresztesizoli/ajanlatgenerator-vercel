// main.js – modern Google Maps helykeresés (PlaceAutocompleteElement + Distance API integráció)

let autocomplete;

function initAutocomplete() {
  console.log("Google Maps API init");

  const input = document.getElementById("location");
  const searchElement = document.createElement("gmpx-placeautocomplete");

  searchElement.id = "autocomplete";
  searchElement.setAttribute("style", "width: 100%; display: block; margin-bottom: 1em;");
  searchElement.setAttribute("input-id", "location");

  input.parentNode.insertBefore(searchElement, input.nextSibling);

  searchElement.addEventListener("gmpx-placeautocomplete:place", async (event) => {
    const selectedPlace = event.detail; // .formatted_address is optional
    const destination = selectedPlace.formatted_address || selectedPlace.name;
    document.getElementById("location").value = destination;
    await calculateDistance(destination);
  });
}

window.initAutocomplete = initAutocomplete;

async function calculateDistance(destination) {
  const origin = "2040 Budaörs, Szivárvány utca 3";
  const multiplier = parseFloat(document.getElementById("multiplier").value || "150");

  try {
    const response = await fetch(`/api/distance?destination=${encodeURIComponent(destination)}`);
    const data = await response.json();
    if (!data || !data.distanceKm) throw new Error("Distance not found");

    const price = Math.round(data.distanceKm * 2 * multiplier / 1000) * 1000;
    document.getElementById("distanceFee").value = price;
  } catch (error) {
    console.error("Távolság lekérdezés hiba:", error);
  }
}

// PDF generálás

function generatePDF() {
  const doc = new jsPDF();
  doc.text("Ajánlat", 20, 20);

  const fields = [
    "brideName",
    "groomName",
    "weddingDate",
    "ceremonyTime",
    "guestCount",
    "location",
    "multiplier",
    "distanceFee",
    "package"
  ];

  let y = 30;
  for (const id of fields) {
    const el = document.getElementById(id);
    const label = el.getAttribute("data-label") || id;
    const value = el.value;
    doc.text(`${label}: ${value}`, 20, y);
    y += 10;
  }

  doc.save("ajanlat.pdf");
}

document.getElementById("generateBtn").addEventListener("click", generatePDF);
