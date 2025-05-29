const API_KEY = "11845b16191d4e970987e59662f49847"; 

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
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

const setBackground = weather => {
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
