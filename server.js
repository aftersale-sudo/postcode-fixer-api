const express = require("express");
const app = express();

app.use(express.json());

app.post("/fix-postcode", (req, res) => {
  const { postcode } = req.body;

  if (!postcode) {
    return res.json({ success: false, message: "Postcode is required" });
  }

  // Convert ke string
  let code = String(postcode).trim();

  // Buang karakter selain nombor
  code = code.replace(/\D/g, "");

  // Jika poskod lebih dari 5 digit → ambil 5 yang pertama
  if (code.length > 5) {
    code = code.substring(0, 5);
  }

  // Jika kurang 5 digit → tambah 0 di depan
  if (code.length < 5) {
    code = code.padStart(5, "0");
  }

  return res.json({
    success: true,
    fixed_postcode: code
  });
});

app.listen(3000, () => console.log("Postcode API running on port 3000"));
