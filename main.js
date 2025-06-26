
function initAutocomplete() {
  const input = document.getElementById("location");
  if (!input) return;
  const autocomplete = new google.maps.places.Autocomplete(input);
  console.log("Google Maps API init");

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.formatted_address) {
      fetch(`/api/distance?destination=${encodeURIComponent(place.formatted_address)}`)
        .then(res => res.json())
        .then(data => {
          const travelField = document.getElementById("travel");
          const rate = parseInt(document.getElementById("rate").value || "150");
          if (data.distance) {
            const distance = data.distance * 2;
            const cost = Math.round(distance * rate / 1000) * 1000;
            travelField.value = cost;
          }
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  for (let h = 0; h < 24; h++) hour.innerHTML += `<option value="${h.toString().padStart(2, '0')}">${h}</option>`;
  for (let m = 0; m < 60; m += 15) minute.innerHTML += `<option value="${m.toString().padStart(2, '0')}">${m}</option>`;

  document.getElementById("rate").addEventListener("input", () => {
    document.getElementById("location").dispatchEvent(new Event("change"));
  });

  document.getElementById("isHungarian").addEventListener("change", e => {
    const show = e.target.value === "no";
    document.getElementById("nonHungarianOptions").style.display = show ? "block" : "none";
  });

  document.getElementById("internationalOption").addEventListener("change", e => {
    const show = e.target.value === "custom";
    document.getElementById("customCostLabel").style.display = show ? "block" : "none";
  });

  document.getElementById("generate").addEventListener("click", () => {
    alert("PDF generálása folyamatban (fejlesztés alatt)");
  });
});
