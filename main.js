
document.addEventListener("DOMContentLoaded", () => {
  const hourSelect = document.getElementById("startHour");
  for (let i = 0; i <= 23; i++) {
    const option = document.createElement("option");
    option.value = option.textContent = i.toString().padStart(2, "0");
    hourSelect.appendChild(option);
  }

  document.getElementById("distance").addEventListener("input", calculateTravelCost);
  document.getElementById("kmPrice").addEventListener("input", calculateTravelCost);
  document.getElementsByName("isHungary").forEach(r => {
    r.addEventListener("change", handleLocationType);
  });

  document.getElementById("generatePDF").addEventListener("click", () => {
    const content = document.getElementById("pdfTarget");
    if (!content || content.innerHTML.trim() === "") {
      alert("Előbb készítsd el az előnézetet!");
      return;
    }
    const opt = {
      margin: 0.5,
      filename: 'ajanlat.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    setTimeout(() => {
      html2pdf().set(opt).from(content).save();
    }, 200);
  });

  calculateTravelCost();
  handleLocationType();
});

function calculateTravelCost() {
  const distance = parseFloat(document.getElementById("distance").value) || 0;
  const kmPrice = parseFloat(document.getElementById("kmPrice").value) || 0;
  let result = Math.round(distance * 2 * kmPrice / 1000) * 1000;
  document.getElementById("travelCost").value = result;
}

function handleLocationType() {
  const isHungary = document.querySelector('input[name="isHungary"]:checked').value === "igen";
  document.getElementById("customTextContainer").style.display = isHungary ? "none" : "block";
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${year}.${month}.${day}`;
}

function generatePreview() {
  const bride = document.getElementById("brideName").value;
  const groom = document.getElementById("groomName").value;
  const date = formatDate(document.getElementById("weddingDate").value);
  const hour = document.getElementById("startHour").value;
  const minute = document.getElementById("startMinute").value;
  const location = document.getElementById("location").value;
  const guests = document.getElementById("guests").value;
  const package = document.getElementById("package").value;
  const distance = document.getElementById("distance").value;
  const kmPrice = document.getElementById("kmPrice").value;
  const travelCost = document.getElementById("travelCost").value;
  const isHungary = document.querySelector('input[name="isHungary"]:checked').value === "igen";
  const customText = document.getElementById("customText").value;
  const costType = document.getElementById("foreignCostType")?.value;

  const logoHTML = '<img src="logo.png" alt="Angel Ceremony logó" style="max-width: 120px; margin-bottom: 1em;" />';

  let costText = isHungary ? `${travelCost} Ft` : (costType === "custom" ? customText : `${travelCost} Ft`);

  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      ${logoHTML}
      <h2>Ajánlat</h2>
      <p><strong>${bride}</strong> és <strong>${groom}</strong> részére</p>
      <p><strong>Dátum:</strong> ${date}</p>
      <p><strong>Időpont:</strong> ${hour}:${minute}</p>
      <p><strong>Helyszín:</strong> ${location} (${isHungary ? "Magyarországon" : "külföldön"})</p>
      <p><strong>Vendégek száma:</strong> ${guests} fő</p>
      <p><strong>Csomag:</strong> ${package}</p>
      <p><strong>Kiszállási díj:</strong> ${costText}</p>
    </div>
  `;

  const target = document.getElementById("pdfTarget");
  if (target) {
    target.innerHTML = html;
    document.getElementById("generatePDF").style.display = "inline-block";
  } else {
    alert("Nem található a pdfTarget elem!");
  }
}
