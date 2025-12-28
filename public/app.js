async function loadData() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Enter a city");

  // Weather
  const weatherRes = await fetch(`/api/weather?city=${city}`);
  const weather = await weatherRes.json();

  if (weather.error) {
    document.getElementById("weather").innerText = weather.error;
    return;
  }

  document.getElementById("weather").innerHTML = `
    <h3>Weather</h3>
    <p>Temperature: ${weather.temperature} °C</p>
    <p>Feels like: ${weather.feelsLike} °C</p>
    <p>Description: ${weather.description}</p>
    <p>Wind speed: ${weather.windSpeed} m/s</p>
    <p>Country: ${weather.countryCode}</p>
    <p>Rain (last 3h): ${weather.rain3h}</p>
  `;

// News
const newsRes = await fetch(`/api/news?city=${city}`);
const news = await newsRes.json();

if (!news.articles || news.articles.length === 0) {
  document.getElementById("news").innerHTML = `
    <h3>📰 News</h3>
    <p>No recent news found for this city.</p>
  `;
} else {
  document.getElementById("news").innerHTML = `
    <h3>📰 News</h3>
    <ul>
      ${news.articles
        .map(
          a =>
            `<li><a href="${a.url}" target="_blank">${a.title}</a> <small>(${a.source})</small></li>`
        )
        .join("")}
    </ul>
  `;
}
}