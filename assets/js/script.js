var apiKey = "0dabe66a652b4986d45a4f8a9323257e";
var searchButton = document.getElementById("search");
searchButton.addEventListener("click", getWeather);

function getWeather() {
  var cityInput = document.getElementById("city-search");
  var city = cityInput.value;
  //   alert(city);
  getCity(city);
}
function getCity(city) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data.coord.lat;
      var long = data.coord.lon;
      currentWeather(lat, long);
    });
}
function currentWeather(lat, long) {
  //get current weather
  var url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&units=imperial&appid=" +
    apiKey;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function forcastWeather(lat, long) {}
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
