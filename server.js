const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const API_KEY = getEnv("OPENWEATHER_API_KEY");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(404).json({ error: data.message });
    }

    const result = {
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      windSpeed: data.wind.speed,
      countryCode: data.sys.country,
      rain3h: data.rain?.["3h"] || 0
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather", details: err.message });
  }
});

// News API
app.get("/api/news", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const API_KEY = getEnv("NEWS_API_KEY");
    const url = `https://newsapi.org/v2/everything?q=${city}&pageSize=5&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(500).json({ error: "Failed to fetch news" });
    }

    const articles = data.articles.map(a => ({
      title: a.title,
      source: a.source.name,
      url: a.url
    }));

    res.json({ city, articles });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news", details: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
