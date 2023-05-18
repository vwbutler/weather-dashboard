var apiKey = "0dabe66a652b4986d45a4f8a9323257e";
var searchButton = document.getElementById("search");
searchButton.addEventListener("click", getWeather);

function getWeather() {
  var cityInput = document.getElementById("city-search");
  var city = cityInput.value;
  getCity(city);
  getCityAgain(city);
}
function getCity(city) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data.coord.lat;
      var long = data.coord.lon;
      document.getElementById("current-weather").innerHTML = "";
      var cityEl = document.createElement("h2");
      cityEl.innerText = data.name;
      document.getElementById("current-weather").appendChild(cityEl);

      var dateEl = document.createElement("span");
      dateEl.innerText = dayjs.unix(data.dt).format("MM-DD-YYYY");
      document.getElementById("current-weather").appendChild(dateEl);

      var imageEl = document.createElement("img");
      imageEl.src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      document.getElementById("current-weather").appendChild(imageEl);

      var tempEl = document.createElement("p");
      tempEl.innerText = "Temp: " + data.main.temp;
      document.getElementById("current-weather").appendChild(tempEl);

      var humidityEl = document.createElement("p");
      humidityEl.innerText = "Humidity: " + data.main.humidity;
      document.getElementById("current-weather").appendChild(humidityEl);

      var windspeedEl = document.createElement("p");
      windspeedEl.innerText = "Wind speed: " + data.wind.speed;
      document.getElementById("current-weather").appendChild(windspeedEl);
    });
}

function getCityAgain(city) {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      document.getElementById("forecast-weather").innerHTML = "";
      for (var i = 7; i < data.list.length; i += 8) {
        var forecastDay = data.list[i];
        var forecastDateEl = document.createElement("p");
        forecastDateEl.innerText = dayjs
          .unix(forecastDay.dt)
          .format("MM-DD-YYYY");
        document.getElementById("forecast-weather").appendChild(forecastDateEl);
        var forecastWindspeedEl = document.createElement("p");
        forecastWindspeedEl.innerText =
          "Wind speed: " + data.list[i].wind.speed;
        document
          .getElementById("forecast-weather")
          .appendChild(forecastWindspeedEl);
        var forecastTempEl = document.createElement("p");
        forecastTempEl.innerText = "Temp: " + data.list[i].main.temp;
        document.getElementById("forecast-weather").appendChild(forecastTempEl);
        var forecastHumidityEl = document.createElement("p");
        forecastHumidityEl.innerText =
          "Humidity: " + data.list[i].main.humidity;
        document
          .getElementById("forecast-weather")
          .appendChild(forecastHumidityEl);
      }
    });
}
