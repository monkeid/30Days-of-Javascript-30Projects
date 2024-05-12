const apikey = "aafa955860b7c14dd8b2d06a05386657";
      const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".weather-icon");
      const errorDiv = document.querySelector(".error");
      const weatherDiv = document.querySelector(".weather");

      async function checkWeather(city) {
        try {
          const response = await fetch(apiUrl + city + `&appid=${apikey}`);
          const data = await response.json();

          if (response.status === 404) {
            throw new Error("City not found");
          }

          errorDiv.style.display = "none";
          weatherDiv.style.display = "block";

          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = `${Math.round(
            data.main.temp
          )}°C`;
          document.querySelector(
            ".humidity"
          ).innerHTML = `${data.main.humidity}%`;
          document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

          switch (data.weather[0].main) {
            case "Clouds":
              weatherIcon.src = "./images/clouds.png";
              break;
            case "Clear":
              weatherIcon.src = "./images/clear.png";
              break;
            case "Rain":
              weatherIcon.src = "./images/rain.png";
              break;
            case "Drizzle":
              weatherIcon.src = "./images/drizzle.png";
              break;
            case "Mist":
              weatherIcon.src = "./images/mist.png";
              break;
            default:
              weatherIcon.src = "./images/default.png"; // add a default image
          }
        } catch (error) {
          errorDiv.style.display = "block";
          weatherDiv.style.display = "none";
          console.error(error);
        }
      }

      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
      });