const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', () => {
  const input = document.querySelector('.search-box input');
  const city = input.value;

  // Make the API request
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9264eb5bc20aa579b62b3bd0f17dad64`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        // Show error message for invalid location
        container.classList.add('error');
        weatherBox.classList.remove('fadeIn');
        weatherDetails.classList.remove('fadeIn');
        error404.style.display = 'block';
      } else {
        // Update weather information
        container.classList.remove('error');
        error404.style.display = 'none';

        const temperatureElement = document.querySelector('.temperature');
        const descriptionElement = document.querySelector('.description');
        const humidityElement = document.querySelector('.humidity span');
        const windElement = document.querySelector('.wind span');

        const temperature = Math.round(data.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        temperatureElement.innerHTML = `${temperature}°C`;
        descriptionElement.innerHTML = description;
        humidityElement.innerHTML = `${humidity}%`;
        windElement.innerHTML = `${windSpeed} m/s`;

        // Show weather information
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

