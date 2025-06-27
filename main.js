
console.log("Google Maps API init");

document.addEventListener("DOMContentLoaded", () => {
  const kmRateInput = document.getElementById("km-rate");
  const totalKmInput = document.getElementById("total-km");
  const travelCostInput = document.getElementById("travel-cost");

  // KM-díj módosítása után újraszámolás
  kmRateInput.addEventListener("input", () => {
    const km = parseFloat(totalKmInput.value);
    const rate = parseFloat(kmRateInput.value);
    if (!isNaN(km) && !isNaN(rate)) {
      travelCostInput.value = Math.round(km * rate / 1000) * 1000;
    }
  });

  // Ha a total km változna (pl. automatikusan), újraszámoljuk
  totalKmInput.addEventListener("input", () => {
    const km = parseFloat(totalKmInput.value);
    const rate = parseFloat(kmRateInput.value);
    if (!isNaN(km) && !isNaN(rate)) {
      travelCostInput.value = Math.round(km * rate / 1000) * 1000;
    }
  });
});
