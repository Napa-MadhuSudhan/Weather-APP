document.addEventListener('DOMContentLoaded', () => {
    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            const cityInput = document.getElementById('city');
            const cityList = data;

            cityInput.addEventListener('input', () => {
                const value = cityInput.value.toLowerCase();
                const suggestions = cityList.filter(city => 
                    city.name.toLowerCase().includes(value)
                );
                
                displaySuggestions(suggestions);
            });
        });
});

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        getWeatherData(city);
        getForecastData(city);
    } else {
        alert('Please enter a city name.');
    }
});

function filterCities(query) {
    fetch('cities.json')
        .then(response => response.json())
        .then(cities => {
            const filteredCities = cities
                .filter(city => city.name.toLowerCase().includes(query.toLowerCase()))
                .sort((a, b) => a.name.localeCompare(b.name));
            displaySuggestions(filteredCities);
        })
        .catch(error => console.error('Error fetching city data:', error));
}

function displaySuggestions(cities) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    cities.forEach(city => {
        const div = document.createElement('div');
        div.textContent = `${city.name}, ${city.country}`;
        div.addEventListener('click', function() {
            document.getElementById('city').value = `${city.name}, ${city.country}`;
            clearSuggestions();
        });
        suggestions.appendChild(div);
    });
}

function clearSuggestions() {
    document.getElementById('suggestions').innerHTML = '';
}

function getWeatherData(city) {
    const apiKey = '60acf7a976bd6933dac72687e2702a7c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            const weather = data.weather[0].main;
            const tempCelsius = data.main.temp;
            updateWeatherInfo(city, weather, tempCelsius);
        } else {
            alert('City not found');
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

function getForecastData(city) {
    const apiKey = '60acf7a976bd6933dac72687e2702a7c';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === "200") {
            // Get forecast data at intervals of 24 hours (around midday)
            const forecast = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
            populateForecast(forecast);
        } else {
            alert('City not found');
        }
    })
    .catch(error => {
        console.error('Error fetching forecast data:', error);
    });
}

function populateForecast(forecast) {
    const forecastDays = document.querySelectorAll('.forecast-day');
    
    forecastDays.forEach((day, index) => {
        // Check if there is corresponding data for the day
        if (forecast[index]) {
            const date = new Date(forecast[index].dt * 1000);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
            const weather = forecast[index].weather[0].main;
            const tempCelsius = forecast[index].main.temp;

            day.innerHTML = `
                <h3>${dayOfWeek}</h3>
                <p>Weather: ${weather}</p>
                <p>Temp: ${tempCelsius.toFixed(2)} °C / ${celsiusToFahrenheit(tempCelsius).toFixed(1)} °F</p>
            `;
            day.style.display = 'block'; // Show the div once it has content
        }
    });
}

function updateWeatherInfo(city, weather, tempCelsius) {
    document.getElementById('cityName').textContent = city;
    document.getElementById('weatherDesc').textContent = `Weather: ${weather}`;
    document.getElementById('temperature').textContent = `Temperature: ${tempCelsius.toFixed(2)} °C / ${celsiusToFahrenheit(tempCelsius).toFixed(1)} °F`;

    let emoji = '';
    let themeClass = 'default-theme';

    switch(weather.toLowerCase()) {
        case 'clear':
            emoji = '☀️'; // Sun
            themeClass = 'sunny-theme';
            break;
        case 'rain':
        case 'drizzle':
            emoji = '🌧️'; // Rain
            themeClass = 'rainy-theme';
            break;
        case 'clouds':
            emoji = '☁️'; // Clouds
            themeClass = 'cloudy-theme';
            break;
        case 'haze':
            emoji = '🌫️'; // Haze
            themeClass = 'hazy-theme';
            break;
        case 'snow':
            emoji = '❄️'; // Snow
            themeClass = 'snowy-theme';
            break;
        case 'thunderstorm':
            emoji = '⛈️'; // Thunderstorm
            themeClass = 'stormy-theme';
            break;
        case 'mist':
            emoji = '🌁'; // Mist
            themeClass = 'misty-theme';
            break;
        case 'fog':
            emoji = '🌁'; // Fog
            themeClass = 'foggy-theme';
            break;
        default:
            emoji = '🌈'; // Default emoji (rainbow)
            themeClass = 'default-theme';
            break;
    }

    document.getElementById('weatherEmoji').textContent = emoji;
    document.getElementById('app').className = themeClass;
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}
