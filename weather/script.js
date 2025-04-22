document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
  
    if (!city) {
      alert("Please enter a city name!");
      return;
    }
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=07c4895d180d296e163e437a2f55b175&units=metric`;
  
    console.log(`Fetching: ${apiUrl}`);
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(data => {
        document.getElementById("weatherResult").innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>🌡 Temperature: ${data.main.temp} °C</p>
          <p>⛅ Weather: ${data.weather[0].description}</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        `;
      })
      .catch(error => {
        alert(`❌ Error: ${error.message}`);
      });
  });
  