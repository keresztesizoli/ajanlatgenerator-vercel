function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const bride = document.getElementById('brideName').value;
  const groom = document.getElementById('groomName').value;
  const date = document.getElementById('weddingDate').value;
  const time = document.getElementById('ceremonyTime').value;
  const location = document.getElementById('location').value;
  const guests = document.getElementById('guests').value;
  const kmPrice = document.getElementById('kmPrice').value;

  const content = `
    Menyasszony: ${bride}
    Vőlegény: ${groom}
    Esküvő dátuma: ${date}
    Szertartás kezdete: ${time}
    Helyszín: ${location}
    Létszám: ${guests} fő
    Számított km-díj: ${kmPrice} Ft
  `;

  doc.setFontSize(18);
  doc.text("Angel Ceremony – Esketési ajánlat", 20, 20);
  doc.setFontSize(12);
  doc.text(content, 20, 40);
  doc.save("eskuvoi_ajanlat.pdf");
}
