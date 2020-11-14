$(document).ready(function () {
  var apiKey = "a834dd510cabc62c09f14e9a034697fd";

  function getCurrentWeather(city) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        apiKey,
      method: "GET",
    }).then(function (response) {
      $(".city").html("<h1>" + response.name + " Weather Details" + "</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature: " + response.main.temp);

      if (storage.indexOf(city) === -1) {
        storage.push(city);
        localStorage.setItem("storage", JSON.stringify(storage));
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
          $(".uvIndex").text("UV Index: " + response.value);
        });
      }
      getUV(response.coord.lat, response.coord.lon);
    
    
    
    });
/*
    function forecast(city) {
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          apiKey,
        method: "Get",
      }).then(function (response) {
        console.log(response);
        response.dt;
        response.main.temp;
        response.main.humidity;
      });
     
    }
  }
*/

  $("#submit").on("click", function (event) {
    event.preventDefault();
    var city1 = $("#locationInput").val();
    getCurrentWeather(city1);
    forecast(city1);
  });

  //pull data or create empty array
  var storage = JSON.parse(localStorage.getItem("storage")) || [];
});
