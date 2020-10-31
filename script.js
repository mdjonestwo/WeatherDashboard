$(document).ready(function () {
    // add here so all functions can grab
    var apiKey = "a834dd510cabc62c09f14e9a034697fd";
    $("#submit").click(function () {
      var city1 = $("#locationInput").val();
      getCurrentWeather(city1);
    });

    function getCurrentWeather(city) {
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          apiKey,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        if (storage.indexOf(city) === -1) {
          storage.push(city);
          localStorage.setItem("storage", JSON.stringify(storage));
        }

        var mainName = $("<div>").attr("id", city);
        // console.log(mainName);

        var cityData = $(".city").html(
          "<h1>" + response.name + " Weather Details</h1>"
        );
        var windData = $(".wind").text("Wind Speed: " + response.wind.speed);
        var humidData = $(".humidity").text(
          "Humidity: " + response.main.humidity
        );

        // Convert the temp to fahrenheit
        var tempF = response.main.temp;

        // add temp content to html
        //var tempData = $(".temp").text("Temperature (K) " + response.main.temp);
        var tempDataF = $(".temp").text(
          "Temperature (F) " + tempF.toFixed(1)
        );

        mainName.appendTo(".stuff");
        mainName.append(cityData, windData, humidData, tempDataF);
        getUV(response.coord.lat, response.coord.lon);
        //add getForcast
      });
    }

    function getUV(lat, long) {
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          lat +
          "&lon=" +
          long +
          "&appid=" +
          apiKey,
        method: "GET",
      }).then(function (response) {
        console.log(response);
      });
    }
    //pull data or create empty array
    var storage = JSON.parse(localStorage.getItem("storage")) || [];
  });