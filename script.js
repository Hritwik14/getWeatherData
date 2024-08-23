document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or other error');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching weather data. Please try again.');
        });
}


function displayWeather(data) {
    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    const cityName = data.name;
    const description = data.weather[0].description;
    const temperature = `Temperature: ${data.main.temp} °C`;
    const humidity = `Humidity: ${data.main.humidity}%`;
    const wind = `Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind').textContent = wind;

    document.getElementById('weatherInfo').style.display = 'block';
}
