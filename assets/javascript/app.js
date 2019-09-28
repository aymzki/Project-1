
 // Two things will happen when you click Submit button: 
 // 1) The search results for the recipes 
 // 2)The weather of the location will show up on the sidebar.
 // This is the code for 2)
 
$("#search-city").on("click", function(event){
    event.preventDefault();

 // Here we are building the URL we need to query the database
 var cityInput = $("#city-input").val().trim();

 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413";


   $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".temp").text("Temperature (F) " + response.main.temp);
    $(".weather").text("Weather: " + response.weather[0].main); 
    $(".description").text("Description: " + response.weather[0].description);
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);

    // Log the data in the console as well
    console.log("Temperature (F): " + response.main.temp);
    console.log("Weather:" + response.weather[0].main);
    console.log("Description:" + response.weather[0].description);
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);

  });
});