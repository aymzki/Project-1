
///////////////////////////////FIRST RENDER THE WEATHER
$(document).ready(function () {

    //SEARCH CITY AND DISPLAY DATA
    $("#search-city").on("click", function (event) {
        event.preventDefault();

        // Here we are building the URL we need to query the database
        var cityInput = $("#city-input").val().trim();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413";


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(queryURL);
                console.log(response);

                //DISPLAY WEATHER DATA
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

//////////////////////////////////THEN SUGGEST RECIPES

    var avgWeatherTemp;

    //WEATHER & RECIPE API COMBINE
    $("#search-city").on("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var maxWeatherTemp = response.main.temp_max;
            var minWeatherTemp = response.main.temp_min;
            avgWeatherTemp = (maxWeatherTemp + minWeatherTemp) / 2;
            $("#weather-view").html("<p>" + avgWeatherTemp + "kelvin </p>");
            if (avgWeatherTemp > 200) {
                var warmWeatherCategories = ["smoothie", "salad", "cold soup"];
                var apiID = "9974c215";
                var apiKey = "66e631dd94f26b89b80cfb12794ede2c";
                var foodURL = "https://api.edamam.com/search?q=" + warmWeatherCategories[0] + "&app_id=" + apiID + "&app_key=" + apiKey;
                $.ajax({
                    url: foodURL,
                    method: "GET"
                }).then(function (data) {
                    console.log(data);
                    $("#weather-view").html("<p> Recipe Name: " + data.hits[0].recipe.label + "</p>")
                });
            };
        });
    });

    //RECIPES CHOSEN
    $(document).ready(function () {
        var mainIngredient;

        function generateRecipes() {
            //on click of button will automatically search for meals with chicken breast as the main ingredient
            var search = mainIngredient
            var queryURL = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + search;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                //stores the chicken breast meals response in a variable called results
                var results = response.meals
                //for each meal go in and find the mealID
                for (var i = 0; i < results.length; i++) {
                    var mealID = results[i].idMeal;
                    //search the mealID of each chicken breast meal response
                    var mealURL = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealID;
                    $.ajax({
                        url: mealURL,
                        method: "GET"
                    }).then(function (data) {
                        //for each meal ID get the necessary information
                        var mealResults = data.meals;
                        for (var j = 0; j < mealResults.length; j++) {
                            //store ingredients into an array - not all ingredients will have something listed
                            var ingredients = [mealResults[j].strIngredient1, mealResults[j].strIngredient2, mealResults[j].strIngredient3, mealResults[j].strIngredient4, mealResults[j].strIngredient5, mealResults[j].strIngredient6, mealResults[j].strIngredient7, mealResults[j].strIngredient8, mealResults[j].strIngredient9, mealResults[j].strIngredient10, mealResults[j].strIngredient11, mealResults[j].strIngredient12, mealResults[j].strIngredient13, mealResults[j].strIngredient14, mealResults[j].strIngredient15, mealResults[j].strIngredient16, mealResults[j].strIngredient17, mealResults[j].strIngredient18, mealResults[j].strIngredient19, mealResults[j].strIngredient20,]
                            //store measurements into an array - not all measurements will have something listed
                            var measurements = [mealResults[j].strMeasure1, mealResults[j].strMeasure2, mealResults[j].strMeasure3, mealResults[j].strMeasure4, mealResults[j].strMeasure5, mealResults[j].strMeasure6, mealResults[j].strMeasure7, mealResults[j].strMeasure8, mealResults[j].strMeasure9, mealResults[j].strMeasure10, mealResults[j].strMeasure11, mealResults[j].strMeasure12, mealResults[j].strMeasure13, mealResults[j].strMeasure14, mealResults[j].strMeasure15, mealResults[j].strMeasure16, mealResults[j].strMeasure17, mealResults[j].strMeasure18, mealResults[j].strMeasure19, mealResults[j].strMeasure20,]
                            //store instructions into an array
                            var instructions = mealResults[j].strInstructions;
                            //store images into an array
                            var image = mealResults[j].strMealThumb;
                            //creates a new paragraph to store everything into at the end
                            var parentRow = $("<div>");
                            var leftColDiv = $("<div>");
                            var rightColDiv = $("<div>");
                            var childRow = $("<div>");
                            //creates a new image tag to display each image
                            var displayImage = $("<img>");
                            //gets the index of the ingredient index of the first ingredient with just a space as it's content
                            var firstSpaceIng = ingredients.indexOf(" ");
                            //uses the firstSpaceIng index to slice off the portion of the array that only has actual ingredients listed and stores them in a new array
                            var newIngredientsArray = ingredients.slice(0, firstSpaceIng);
                            //gets the index of the measurement index of the first measurement with a just a space as it's content
                            var firstSpaceMeas = measurements.indexOf(" ");
                            //uses the firstSpaceMeas index to slice off the portion of the array that only has actual measuerments listed and stores them in a a new array
                            var newMeasurementsArray = measurements.slice(0, firstSpaceMeas);
                            //this array combines both the measurements array and the ingredients array based on their indexes
                            var newArray = newMeasurementsArray.map((e, i) => e + " " + newIngredientsArray[i]);
                            //this loops through the new array and stores each combintation in their own div which is appended to the paragraph
                            for (var x = 0; x < newArray.length; x++) {
                                var newDiv = $("<div>");
                                newDiv.text(newArray[x]);
                                rightColDiv.append(newDiv);
                            };
                            displayImage.attr("src", image);
                            displayImage.attr("data-category", mealResults[0].strCategory);
                            displayImage.addClass("image");
                            parentRow.addClass("row px-0");
                            leftColDiv.append(displayImage);
                            leftColDiv.addClass("col-6 pl-0");
                            rightColDiv.addClass("col-6");
                            childRow.append(instructions);
                            childRow.addClass("row mx-0");
                            $(parentRow).append(leftColDiv, rightColDiv, childRow);
                            $("#recipe-view").append(parentRow);
                        };
                    });
                };
            });
        };

        //RECIPES DISPLAYED
        $("#search-city").on("click", function (event) {
            event.preventDefault();
            $("#recipe-view").empty();
            mainIngredient;
            var city = $("#city-input").val();
            var appKey = "166a433c57516f51dfab1f7edaed8413"
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var maxWeatherTemp = response.main.temp_max;
                var minWeatherTemp = response.main.temp_min;
                var farenheightMax = maxWeatherTemp * 9 / 5 - 459.67;
                var farenheightMin = minWeatherTemp * 9 / 5 - 459.67;
                var avgWeatherTemp = Math.floor((farenheightMax + farenheightMin) / 2);
                console.log(avgWeatherTemp);
                if (avgWeatherTemp <= 32) {
                    var freezingTempFood = ["beef gravy", "beef", "lamb"];
                    mainIngredient = freezingTempFood[0];
                    console.log(mainIngredient);
                } else if (avgWeatherTemp > 32 && avgWeatherTemp < 50) {
                    var coldTempFood = ["rice", "chili powder", "potato"];
                    mainIngredient = coldTempFood[0];
                    console.log(mainIngredient);
                } else if (51 < avgWeatherTemp && avgWeatherTemp < 80) {
                    var warmTempFood = ["chicken", "corn"];
                    mainIngredient = warmTempFood[0];
                    console.log(mainIngredient);
                } else if (81 < avgWeatherTemp && avgWeatherTemp < 89) {
                    var hotTempFood = ["salmon", "avocado"];
                    mainIngredient = hotTempFood[0];
                    console.log(mainIngredient);
                } else {
                    mainIngredient = null;
                    alert("It's too hot to eat or drink anything other than water. Order in and stay hydrated friends!");
                    console.log(mainIngredient)
                    $("#recipe-view").empty();
                };
                generateRecipes();
                $("#city-input").val("");
            });
        });




        ///////////////////////////////////////THEN SUGGEST 3 DRINKS


    });

});

