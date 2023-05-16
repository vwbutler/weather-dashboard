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

      //do a fetch request for the 5 day data (different URL)
      //with the 5 day data, do a for loop
      //for loop should start on 7 (i should be 7) loop over the list.length and increase the i variable by
      //8 each time (instead of i++ it will be i=8)
      //the api offers objects every 3 hours which will total 40. Therefore we need to offset
      //by 8 to get the next day.

      //inside the loop we will use the same
      //create the element in js and assign in a var
      //adjust the elements (or image) in text to the data

      // ex. windspeedEl.innerText = "Wind speed: " + data.list[i].wind.speed;
      //append it to the five day div
    });
}
