const weatherMap = {
    0: ["Clear sky", "☀️"],
    1: ["Mostly clear", "🌤️"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Foggy", "🌫️"],
    48: ["Icy fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Drizzle", "🌦️"],
    55: ["Heavy drizzle", "🌧️"],
    61: ["Light rain", "🌦️"],
    63: ["Rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    71: ["Light snow", "🌨️"],
    73: ["Snow", "❄️"],
    75: ["Heavy snow", "❄️"],
    80: ["Rain showers", "🌦️"],
    81: ["Rain showers", "🌧️"],
    82: ["Heavy showers", "⛈️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Storm with hail", "⛈️"],
    99: ["Storm with hail", "⛈️"],
};

const getCondition = (code) => weatherMap[code] || ["Mixed weather", "🌤️"];

function Weather({ weatherData, loading = false, error = "" }) {
    if (loading) {
        return (
            <div className="weather-state" role="status">
                <span className="loader" />
                <p>Reading the skies...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="weather-state error" role="alert">
                <span aria-hidden="true">⚠️</span>
                <p>{error}</p>
            </div>
        );
    }

    if (!weatherData) return null;

    const { location, current, current_units: units, daily } = weatherData;
    const [description, icon] = getCondition(current.weather_code);
    const locationLine = [location.admin1, location.country].filter(Boolean).join(", ");

    return (
        <div className="weather-content">
            <section className="current-weather">
                <div className="location-row">
                    <div>
                        <h2>{location.name}</h2>
                        <p>{locationLine}</p>
                    </div>
                    <span className="live-pill"><i /> Live</span>
                </div>

                <div className="hero-weather">
                    <div>
                        <p className="temperature">{Math.round(current.temperature_2m)}°</p>
                        <p className="condition">{description}</p>
                    </div>
                    <span className="weather-icon" role="img" aria-label={description}>{icon}</span>
                </div>

                <div className="weather-details">
                    <div><span>Feels like</span><strong>{Math.round(current.apparent_temperature)}°</strong></div>
                    <div><span>Humidity</span><strong>{current.relative_humidity_2m}{units.relative_humidity_2m}</strong></div>
                    <div><span>Wind</span><strong>{Math.round(current.wind_speed_10m)} {units.wind_speed_10m}</strong></div>
                </div>
            </section>

            <section className="forecast" aria-labelledby="forecast-title">
                <h3 id="forecast-title">5-day forecast</h3>
                <div className="forecast-list">
                    {daily.time.map((date, index) => {
                        const [dayDescription, dayIcon] = getCondition(daily.weather_code[index]);
                        const day = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
                            new Date(`${date}T12:00:00`),
                        );

                        return (
                            <article className="forecast-day" key={date} title={dayDescription}>
                                <p>{index === 0 ? "Today" : day}</p>
                                <span role="img" aria-label={dayDescription}>{dayIcon}</span>
                                <div><strong>{Math.round(daily.temperature_2m_max[index])}°</strong><small>{Math.round(daily.temperature_2m_min[index])}°</small></div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default Weather;
