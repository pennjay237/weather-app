const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const refreshBtn = document.querySelector(".refreshBtn");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("weather-icon");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

const saveLastCity = city => localStorage.setItem("lastCity", city);
const getLastCity = () => localStorage.getItem("lastCity") || "";

const setBackground = (weather) => {
  let imageUrl = "";

  switch (weather) {
    case "Clear":
      imageUrl = "url('https://source.unsplash.com/1600x900/?sunny')";
      break;
    case "Clouds":
      imageUrl = "url('https://source.unsplash.com/1600x900/?cloudy')";
      break;
    case "Rain":
      imageUrl = "url('https://source.unsplash.com/1600x900/?rain')";
      break;
    case "Snow":
      imageUrl = "url('https://source.unsplash.com/1600x900/?snow')";
      break;
    case "Thunderstorm":
      imageUrl = "url('https://source.unsplash.com/1600x900/?thunderstorm')";
      break;
    case "Drizzle":
      imageUrl = "url('https://source.unsplash.com/1600x900/?drizzle')";
      break;
    case "Mist":
      imageUrl = "url('https://source.unsplash.com/1600x900/?mist')";
      break;
    default:
      imageUrl = "url('https://source.unsplash.com/1600x900/?weather')";
  }

  document.body.style.backgroundImage = imageUrl;
};

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    updateWeatherUI(data);
    saveLastCity(city);
    errorMessage.classList.add("hidden");
    weatherInfo.classList.remove("hidden");
  } catch (error) {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
};

const updateWeatherUI = (data) => {
  cityName.textContent = data.name;
  description.textContent = data.weather[0].description;
  temp.textContent = Math.round(data.main.temp);
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = data.weather[0].description;
  setBackground(data.weather[0].main);
};

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

refreshBtn.addEventListener("click", () => {
  cityInput.value = "";
  localStorage.removeItem("lastCity");
  weatherInfo.classList.add("hidden");
  errorMessage.classList.add("hidden");
  document.body.style.backgroundImage = "";
});

window.addEventListener("load", () => {
  const lastCity = getLastCity();
  if (lastCity) {
    cityInput.value = lastCity;
    fetchWeather(lastCity);
  }
});
