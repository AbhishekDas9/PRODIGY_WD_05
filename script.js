const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

async function fetchWeather() {
    const location = document.getElementById('location').value;
    const weatherInfo = document.getElementById('weather-info');

    if (!location) {
        weatherInfo.innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfo.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        const { main, weather, wind, name } = data;
        weatherInfo.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp} °C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error fetching weather data.</p>`;
    }
}