var apiKey = "0dabe66a652b4986d45a4f8a9323257e";
var searchButton = document.getElementById("search");
searchButton.addEventListener("click", getWeather);

function displayHistory() {
  var history = JSON.parse(localStorage.getItem("searches")) || [];
  document.getElementById("history").innerHTML = "";
  history.forEach((city) => {
    var cityEl = document.createElement("button");
    cityEl.innerText = city;
    cityEl.addEventListener("click", function () {
      getWeather(null, city);
    });
    document.getElementById("history").appendChild(cityEl);
  });
}

displayHistory();

function getWeather(event, prevCity) {
  var cityInput = document.getElementById("city-search");
  var city = prevCity || cityInput.value;
  var history = JSON.parse(localStorage.getItem("searches")) || [];
  if (!history.includes(city)) {
    history.push(city);
  }

  localStorage.setItem("searches", JSON.stringify(history));
  displayHistory();

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
      var cityEl = document.createElement("h3");
      cityEl.innerText = data.name;
      document.getElementById("current-weather").appendChild(cityEl);

      var dateEl = document.createElement("h3");
      dateEl.innerText =
        "Today: " + dayjs.unix(data.dt).format("dddd, MMMM D, YYYY");
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
        var forecastDateEl = document.createElement("h3");
        forecastDateEl.innerText = dayjs
          .unix(forecastDay.dt)
          .format("dddd, MMMM D, YYYY");

        document.getElementById("forecast-weather").appendChild(forecastDateEl);

        var forecastImageEl = document.createElement("img");
        forecastImageEl.src =
          "https://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
        forecastImageEl.style.width = "50px";
        document
          .getElementById("forecast-weather")
          .appendChild(forecastImageEl);

        var forecastTempEl = document.createElement("p");
        forecastTempEl.innerText = "Temp: " + data.list[i].main.temp;
        document.getElementById("forecast-weather").appendChild(forecastTempEl);

        var forecastWindspeedEl = document.createElement("p");
        forecastWindspeedEl.innerText =
          "Wind speed: " + data.list[i].wind.speed;
        document
          .getElementById("forecast-weather")
          .appendChild(forecastWindspeedEl);

        var forecastHumidityEl = document.createElement("p");
        forecastHumidityEl.innerText =
          "Humidity: " + data.list[i].main.humidity;
        document
          .getElementById("forecast-weather")
          .appendChild(forecastHumidityEl);
      }
    });
}
