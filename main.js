
// órák betöltése
const hourSelect = document.getElementById("startHour");
for (let i = 0; i <= 23; i++) {
  const option = document.createElement("option");
  option.value = option.textContent = i.toString().padStart(2, "0");
  hourSelect.appendChild(option);
}

// események
document.getElementById("distance").addEventListener("input", calculateTravelCost);
document.getElementById("kmPrice").addEventListener("input", calculateTravelCost);
document.getElementsByName("isHungary").forEach(r => {
  r.addEventListener("change", handleLocationType);
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

function generatePreview() {
  const bride = document.getElementById("brideName").value;
  const groom = document.getElementById("groomName").value;
  const date = document.getElementById("weddingDate").value;
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

  const output = `
    <h3>Előnézet</h3>
    <p><strong>${bride}</strong> és <strong>${groom}</strong> esküvője</p>
    <p>Dátum: ${date}, időpont: ${hour}:${minute}</p>
    <p>Helyszín: ${location} (${isHungary ? "Magyarországon" : "külföldön"})</p>
    <p>Vendégek száma: ${guests}</p>
    <p>Csomag: ${package}</p>
    <p>Kiszállási díj: ${isHungary ? `${travelCost} Ft` : customText}</p>
  `;

  document.getElementById("output").innerHTML = output;
}

calculateTravelCost();
handleLocationType();
