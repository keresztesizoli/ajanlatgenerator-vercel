console.log("Angel Ceremony – script init");

const helyszinInput = document.getElementById("helyszin");
const kmDijInput = document.getElementById("kmDij");
const kiszalDijInput = document.getElementById("kiszalDij");

// újraszámítás kézi mezőváltozásra
kmDijInput.addEventListener("input", () => {
    updateKiszallasiDij();
});
kiszalDijInput.removeAttribute("readonly");

function updateKiszallasiDij(distanceKm = null) {
    const kmDij = parseInt(kmDijInput.value);
    if (!kmDij || isNaN(kmDij)) return;

    if (distanceKm !== null) {
        const dij = Math.round(distanceKm * 2 * kmDij / 1000) * 1000;
        kiszalDijInput.value = dij;
    } else {
        // ha nincs távolság, manuálisan írták át
        kiszalDijInput.value = kiszalDijInput.value;
    }
}

// automatikus távolság lekérés
helyszinInput.addEventListener("change", () => {
    const destination = helyszinInput.value;
    fetch(`/api/distance?destination=${encodeURIComponent(destination)}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === "OK") {
                const km = data.distance_meters / 1000;
                updateKiszallasiDij(km);
            } else {
                console.error("Hiba a távolság lekérésnél:", data);
            }
        })
        .catch(err => {
            console.error("Fetch hiba:", err);
        });
});