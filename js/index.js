document.addEventListener('DOMContentLoaded', () => {
    const dayElement = document.querySelector('.day');
    const dateElement = document.querySelector('.date');
    const temperatureElement = document.querySelector('.temperature');
    const dayContainers = document.querySelectorAll('.day-container');
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const glassCardContainer = document.querySelector('.glass-card-container');

    function updateWeatherData(city) {
        const apiKey = '58baa5c8bd64768d58e829163d6f4475';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                dayElement.textContent = new Date(data.list[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
                dateElement.textContent = new Date(data.list[0].dt * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                temperatureElement.textContent = `${Math.round(data.list[0].main.temp)}°C`;

                for (let i = 1; i <= 5; i++) {
                    const dayContainer = dayContainers[i - 1];
                    const dayData = data.list[i * 8 - 1]; // Use i * 8 - 1 to get data for the correct day
                
                    if (dayData) {
                        const daySmall = dayContainer.querySelector('.day-small');
                        const temp = dayContainer.querySelector('.temp');
                        const icon = dayContainer.querySelector('.icon');
                
                        daySmall.textContent = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
                        temp.textContent = `${Math.round(dayData.main.temp)}°C`;
                        icon.src = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;
                    }
                }
                

                glassCardContainer.classList.add('expanded');

                // Mostrar la información del clima después de actualizar
                weatherInfo.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error al obtener datos del clima:', error);
            });
    }

    // Agregamos un controlador de eventos al botón de búsqueda
    searchButton.addEventListener('click', () => {
        const city = cityInput.value;
        if (city.trim() !== '') {
            updateWeatherData(city);
        }
    });
});