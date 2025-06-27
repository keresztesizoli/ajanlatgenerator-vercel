
function generatePDF() {
  const bride = document.getElementById("bride").value;
  const groom = document.getElementById("groom").value;
  const date = document.getElementById("date").value;
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const location = document.getElementById("location").value;
  const distance = document.getElementById("distance").value;
  const rate = document.getElementById("kmRate").value;
  const cost = document.getElementById("travelCost").value;
  const isHungarian = document.getElementById("isHungarian").value;
  const customText = document.getElementById("customText").value;
  const guests = document.getElementById("guests").value;
  const pack = document.getElementById("package").value;

  document.getElementById("greeting").innerText = 
    `Kedves ${bride} & ${groom}!

Örömmel küldöm el szertartásvezetői ajánlatomat a magyar nyelvű esküvőtökhöz. Az Angel Ceremony által megálmodott 30 perc varázslat lesz – egy felejthetetlen élmény, ami megalapozza az egész nap ünnepi hangulatát.`;

  const kiszallas = isHungarian === "igen" ? `${cost} Ft` : customText;

  const list = `
    <li>Dátum: ${date}</li>
    <li>Időpont: ${hour}:${minute}</li>
    <li>Helyszín: ${location}</li>
    <li>Távolság: ${distance} km</li>
    <li>Kiszállási díj: ${kiszallas}</li>
    <li>Vendégek száma: ${guests}</li>
    <li>Csomag: ${pack}</li>
  `;
  document.getElementById("detailsList").innerHTML = list;

  const element = document.getElementById("preview");
  html2pdf().set({
    margin: 0,
    filename: 'ajanlat.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
  }).from(element).save();
}

window.onload = function() {
  const hourSelect = document.getElementById("hour");
  for (let i = 0; i <= 23; i++) {
    const val = i < 10 ? "0" + i : i;
    hourSelect.innerHTML += `<option value="${val}">${val}</option>`;
  }
};
