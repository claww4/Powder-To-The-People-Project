// Date & Time
function formatDate(timestamp) {
  let now = new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
let am_pm = now.getHours() >= 12 ? "PM" : "AM";
hour = hour < 10 ? "0" + hour : hour;
let minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

let time = hour + ":" + minute + " " + am_pm;

    return `${day}, ${month} ${date}, ${year} ${time}`;
}




// Search for Weather & Temperature
function searchWeather(response) {
  fahrenheitTemperature = response.data.main.temp;
  let temperatureElement = document.querySelectorAll("p.card-text");
  let temperature = Math.round(fahrenheitTemperature);
  let currentDate = document.querySelector(".date-time");

  temperatureElement.forEach(function (title) {
    title.innerHTML = `${temperature}°`;
  });
  document.querySelectorAll("h3.card-subtitle").forEach(function (city) {
    city.innerHTML = response.data.name;
  });
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

// Temperature & Degrees
 function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelectorAll("p.card-text");
  let fahrenheit = Math.round(fahrenheitTemperature);
  temperature.innerHTML = Math.round(fahrenheit);
  temperature.forEach(function (title) {
    title.innerHTML = `${fahrenheit}°`;
  });
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelectorAll("p.card-text");
  let celsius = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  temperature.innerHTML = Math.round(celsius);
  temperature.forEach(function (title) {
    title.innerHTML = `${celsius}°`;
  });
}

let fahrenheitTemperatureLink = document.querySelector("#fahrenheit");
fahrenheitTemperatureLink.addEventListener("click", showFahrenheit);

let celsiusTemperatureLink = document.querySelector("#celsius");
celsiusTemperatureLink.addEventListener("click", showCelsius); 

let fahrenheitTemperature = null;

// Search Form for City
function searchCity(city) {
  let apiKey = "c1b8e5d3086a4fe8a65935253c49312a";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(searchWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#form1").value;
  console.log(city);
  let h3 = document.querySelectorAll("h3.card-subtitle");
  h3.forEach(function (title) {
    title.innerHTML = `${city}`;
  });
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c1b8e5d3086a4fe8a65935253c49312a";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(searchWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#location-form");
button.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#geolocation-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Denver");
