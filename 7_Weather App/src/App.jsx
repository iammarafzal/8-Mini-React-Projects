import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Weather from "./components/Weather";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const locationResponse = await fetch(
        `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
      );

      if (!locationResponse.ok) throw new Error("Could not search for that city.");

      const locationData = await locationResponse.json();
      const location = locationData.results?.[0];

      if (!location) throw new Error("City not found. Check the spelling and try again.");

      const params = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "weather_code",
          "wind_speed_10m",
          "is_day",
        ].join(","),
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
        ].join(","),
        timezone: "auto",
        forecast_days: "5",
      });

      const weatherResponse = await fetch(`${FORECAST_URL}?${params}`);
      if (!weatherResponse.ok) throw new Error("Weather data is unavailable right now.");

      const forecast = await weatherResponse.json();
      setWeatherData({ location, ...forecast });
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load a useful default city when the app first opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getWeather("Karachi");
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const city = search.trim();
    if (!city) return;
    getWeather(city);
  };

  return (
    <main className="app-shell">
      <section className="weather-app">
        <header className="app-header">
          <div>
            <p className="eyebrow">Weather now</p>
            <h1>How’s the sky?</h1>
          </div>
          <span className="brand-mark" aria-hidden="true">☀</span>
        </header>

        <Search
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          loading={loading}
        />

        <Weather weatherData={weatherData} loading={loading} error={error} />
        <footer>Weather data by Open-Meteo</footer>
      </section>
    </main>
  );
}

export default App;
