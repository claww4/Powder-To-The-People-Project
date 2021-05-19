function formatDate() {
  if (currentDate === `${day}, ${month} ${date}, ${year} ${time}`)
    return `${day}, ${month} ${date}, ${year} ${time}`;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
];
let month = months[now.getMonth()];
let hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
let am_pm = now.getHours() >= 12 ? "PM" : "AM";
hour = hour < 10 ? "0" + hour : hour;
let minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
let seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
let time = hour + ":" + minute + ":" + seconds + " " + am_pm;
let currentDate = document.querySelector(".date-time");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year} ${time}`;
formatDate();

/* function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelectorAll("p.card-text");
  let fahrenheit = Math.round((17 * 9) / 5 + 32);
  temperature.forEach(function (title) {
    title.innerHTML = `${fahrenheit}°`;
  });
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelectorAll("p.card-text");
  let celsius = Math.round(((32 - 32) * 5) / 9);
  temperature.forEach(function (title) {
    title.innerHTML = `${celsius}°`;
  });
}

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", showCelsius); */

// Challenge 1
function searchWeather(response) {
  let temperatureElement = document.querySelectorAll("p.card-text");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.forEach(function (title) {
    title.innerHTML = `${temperature}°`;
  });
  document.querySelectorAll("h3.card-subtitle").forEach(function (city) {
    city.innerHTML = response.data.name;
  });
}

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
