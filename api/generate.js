const puppeteer = require("puppeteer");

module.exports = async (req, res) => {
  try {
    const { bride, groom, date, location, package: selectedPackage } = req.body;

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Georgia, serif;
              margin: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            h1 {
              color: #a45d5d;
            }
            .section {
              margin-bottom: 30px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Esketési ajánlat</h1>
            <p>Angel Ceremony</p>
          </div>
          <div class="section">
            <strong>Kedves ${bride} & ${groom}!</strong><br><br>
            Örömmel küldöm el szertartásvezetői ajánlatomat a magyar nyelvű esküvőtökhöz.
            Az Angel Ceremony által megálmodott 30 perc varázslat lesz – egy felejthetetlen élmény,
            ami megalapozza az egész nap ünnepi hangulatát.
          </div>
          <div class="section">
            <strong>Részletek:</strong>
            <ul>
              <li>Dátum: ${date}</li>
              <li>Helyszín: ${location}</li>
              <li>Választott csomag: ${selectedPackage}</li>
            </ul>
          </div>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "30px", bottom: "30px", left: "30px", right: "30px" }
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ajanlat.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("HIBA:", error);
    res.status(500).send("Server error: " + error.message);
  }
};