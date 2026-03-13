const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/get-safe-routes', (req, res) => {

  const { origin, destination } = req.body;

  console.log("Route request:", origin, destination);

  const routes = [
    {
      name: `Main Road Route`,
      safetyScore: Math.floor(Math.random() * 20) + 80,
      distance: (Math.random() * 3 + 1).toFixed(1) + " km",
      time: Math.floor(Math.random() * 20 + 20) + " mins",
      features: "Well lit roads • Shops nearby"
    },
    {
      name: `City Avenue Route`,
      safetyScore: Math.floor(Math.random() * 30) + 60,
      distance: (Math.random() * 3 + 1).toFixed(1) + " km",
      time: Math.floor(Math.random() * 25 + 20) + " mins",
      features: "Wide streets • CCTV areas"
    },
    {
      name: `Park Shortcut`,
      safetyScore: Math.floor(Math.random() * 40) + 40,
      distance: (Math.random() * 2 + 1).toFixed(1) + " km",
      time: Math.floor(Math.random() * 15 + 15) + " mins",
      features: "Side streets • Low lighting"
    }
  ];

  res.json({ routes });

});

app.get("/", (req, res) => {
  res.send("SafeRoute API running");
});

app.listen(PORT, () => {
  console.log(`Safety Routing API running on port ${PORT}`);
});