let now = new Date();
let date = now.getDate();
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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

function formatDate() {
  return `${day}, 
  ${hour}:${minutes}`;
}

var currentTime = document.getElementById("current-day");
currentTime.innerHTML = formatDate();

function weatherInformation(response) {
  console.log(response);
  document.querySelector("#city-selection").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#min-temperature").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temperature").innerHTML = Math.round(
    response.data.main.temp_max
  );
}

function search(city) {
  let apiKey = "2923dd7a5bdee562ae938dba6b36d119";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherInformation);
}

function visibleCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let weather = document.querySelector("#city-form");
weather.addEventListener("submit", visibleCity);

function nowLocation(position) {
  let apiKey = "2923dd7a5bdee562ae938dba6b36d119";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherInformation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(nowLocation);
}

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getCurrentLocation);

search("Bogota");
