$(document).ready(function () {

  var mainIngredient;
  var drinkIngredient;
  var drinksArray = [];
  var recipeIngredient;

  function generateRecipes() {

    //on click of button will automatically search for meals with chicken breast as the main ingredient
    var search = mainIngredient;
    var queryURL = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + search;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      //stores the chicken breast meals response in a variable called results
      var results = response.meals
      //for each meal go in and find the mealID
      for (var i = 0; i < 10; i++) {
        var mealID = results[i].idMeal;
        //search the mealID of each chicken breast meal response
        var mealURL = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealID;
        $.ajax({
          url: mealURL,
          method: "GET"
        }).then(function (data) {
          //for each meal ID get the necessary information
          var mealResults = data.meals;
          for (var j = 0; j < 10; j++) {
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
            var ingredientsHeader = $("<h5>");
            var instructionsHeader = $("<h5>");
            var childRow = $("<div>");
            //creates a new image tag to display each image
            var displayImage = $("<img>");
            //gets the index of the ingredient index of the first ingredient with just a space as it's content
            var newIngredientsArray = [];
            var newMeasurementsArray = [];
            // var firstSpaceIng = ingredients.indexOf(" ");
            // var firstNullIng = ingredients.indexOf(null);
            // if (firstSpaceIng > firstNullIng) {
            //   newIngredientsArray = ingredients.slice(0, firstSpaceIng);
            // } else {
            //   newIngredientsArray = ingredients.slice(0, firstNullIng);
            // }
            //uses the firstSpaceIng index to slice off the portion of the array that only has actual ingredients listed and stores them in a new array
            // var newMeasurementsArray = [];
            //gets the index of the measurement index of the first measurement with a just a space as it's content
            // var firstSpaceMeas = measurements.indexOf(" ");
            // var firstNullMeas = measurements.indexOf(null);
            // if (firstSpaceMeas > firstNullMeas) {
            //   newMeasurementsArray = measurements.slice(0, firstSpaceMeas)
            // } else {
            //   newMeasurementsArray = measurements.slice(0, firstNullMeas);
            // } //filters the ingredients array of nulls and undefineds
            var newIngredientsArray = ingredients.filter(function (element) {
              return element != null && element != "" && element != 0 && element != NaN && element != undefined && element != false;
            });
            //filters the measurements array of nulls and undefineds
            var newMeasurementsArray = measurements.filter(function (element) {
              return element != null && element != "" && element != 0 && element != NaN && element != undefined && element != false;
            });
            //this array combines both the measurements array and the ingredients array based on their indexes
            var newArray = newMeasurementsArray.map((e, i) => e + " " + newIngredientsArray[i]);
            //this loops through the new array and stores each combintation in their own div which is appended to the paragraph
            for (var x = 0; x < newArray.length; x++) {
              var newDiv = $("<div>");
              newDiv.text(newArray[x]);
              rightColDiv.append(newDiv);
            };

            var mealName = mealResults[j].strMeal;
            var nameDisplay = $("<h3>").text(mealName);
            displayImage.attr("src", image);
            displayImage.attr("data-category", mealResults[0].strCategory);
            displayImage.addClass("image");
            displayImage.addClass("z-depth-5");

            //RECIPE BLOCK
            parentRow.addClass("row px-0");

            //IMAGE DIV CONTAINER
            leftColDiv.prepend(nameDisplay);
            leftColDiv.append(displayImage);
            leftColDiv.addClass("col-6 mb-3 pl-0");


            //INGREDIENTS
            ingredientsHeader.text("Ingredients");
            instructionsHeader.text("Instructions");
            rightColDiv.addClass("col-6 mb-3");
            rightColDiv.prepend(ingredientsHeader);
            childRow.append(instructions);
            childRow.prepend(instructionsHeader)
            childRow.addClass("row mx-0");

            //INSTRUCTIONS
            $(parentRow).append(leftColDiv, rightColDiv, childRow);
            $("#recipe-view").append(parentRow);
          };
        });
      };
    });
  };

  $("#search-city").on("click", function (event) {
    event.preventDefault();
    $("#recipe-view").empty();
    $("#drinks-view").empty();
    mainIngredient;
    var city = $("#city-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var maxWeatherTemp = response.main.temp_max;
      var minWeatherTemp = response.main.temp_min;
      var avgWeatherTemp = Math.floor((maxWeatherTemp + minWeatherTemp) / 2);
      console.log(avgWeatherTemp);
      if (avgWeatherTemp <= 32) {
        var freezingTempFood = ["potatoes", "beef", "spinach"];
        var freezingIndex = [Math.floor(Math.random() * freezingTempFood.length)];
        mainIngredient = freezingTempFood[freezingIndex];
        console.log(mainIngredient);
      } else if (avgWeatherTemp > 32 && avgWeatherTemp < 60) {
        var coldTempFood = ["ginger", "nutmeg", "mushrooms"];
        var coldIndex = [Math.floor(Math.random() * coldTempFood.length)];
        mainIngredient = coldTempFood[coldIndex];
        console.log(mainIngredient);
      } else if (60 <= avgWeatherTemp && avgWeatherTemp < 80) {
        var warmTempFood = ["garlic", "carrots", "white wine"];
        var warmIndex = [Math.floor(Math.random() * warmTempFood.length)];
        mainIngredient = warmTempFood[warmIndex];
        console.log(mainIngredient);
      } else {
        var hotTempFood = ["tomatoes", "parlsey", "leek"];
        var hotIndex = [Math.floor(Math.random() * hotTempFood.length)];
        mainIngredient = hotTempFood[hotIndex];
        console.log(mainIngredient);
      };
      generateRecipes();
      $("#city-input").val("");
    });
  });

  $(document).on("click", ".image", function () {
    function getDrinkID() {
      var queryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + drinkIngredient;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        var results = response.drinks;
        for (var i = 0; i < results.length; i++) {

          //to get the drink Names 
          var drinkID = results[i].idDrink;
          displayFullInfo(drinkID);
        }
      });
    };

    function displayFullInfo(drinkID) {
      drinksArray = [];
      var queryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + drinkID;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(queryURL);
        console.log(response.drinks);
        var results = response.drinks;
        for (var i = 0; i < results.length; i++) {
          //stores ingredients into an array - not all ingredients will have something listed
          var ingredients = [results[i].strIngredient1, results[i].strIngredient2, results[i].strIngredient3, results[i].strIngredient4, results[i].strIngredient5, results[i].strIngredient6, results[i].strIngredient7, results[i].strIngredient8, results[i].strIngredient9, results[i].strIngredient10]
          //stores measurements into an array - not all measurements will have something listed
          var measurements = [results[i].strMeasure1, results[i].strMeasure2, results[i].strMeasure3, results[i].strMeasure4, results[i].strMeasure5, results[i].strMeasure6, results[i].strMeasure7, results[i].strMeasure8, results[i].strMeasure9, results[i].strMeasure10]
          //filters the ingredients array of nulls and undefineds
          var newIngredientsArray = ingredients.filter(function (element) {
            return element != null && element != "" && element != 0 && element != NaN && element != undefined && element != false;
          });
          //filters the measurements array of nulls and undefineds
          var newMeasurementsArray = measurements.filter(function (element) {
            return element != null && element != "" && element != 0 && element != NaN && element != undefined && element != false;
          });
          //this array combines both the measurements array and the ingredients array based on their indexes
          var newArray = newMeasurementsArray.map((e, i) => e + " " + newIngredientsArray[i]);
          //creates a new paragraph to store everything into at the end
          var measuredIngredientsDisplay = $("<p>");
          //this loops through the new array and stores each combination in their own div which is appended to the paragraph

          for (var x = 0; x < newArray.length; x++) {
            var newTable = $("<table>");
            newTable.text(newArray[x]);

            measuredIngredientsDisplay.append(newTable);

          }
          var ingredientTitle = $("<h5>").text("Ingredients");
          //to get the drink Names 
          var drinkName = results[i].strDrink;
          var nameDisplay = $("<h3>").text(drinkName);

          var instructionsTitle = $("<h5>").text("Instructions");
          //to get instructions
          var drinkInstuctions = results[i].strInstructions;
          var instructionsDisplay = $("<p>").text(drinkInstuctions);

          //to get the jpgs
          var pixDisplay = $("<img>");
          pixDisplay.attr("src", results[i].strDrinkThumb);
          pixDisplay.attr("class", "drinkGif");
          pixDisplay.addClass("z-depth-5");
          //create a new div to hold all the stuff above
          var bigDiv = $("<div>");
          bigDiv.append(nameDisplay, ingredientTitle, measuredIngredientsDisplay, instructionsTitle, instructionsDisplay, pixDisplay);
          drinksArray.push(bigDiv);
          //create a new drinks arrayh
        }
        displayThreeDrinks();
      });
    };

    function displayThreeDrinks() {
      var randomDrinkA = drinksArray[Math.floor(Math.random() * drinksArray.length)];
      var randomDrinkB = drinksArray[Math.floor(Math.random() * drinksArray.length)];
      var randomDrinkC = drinksArray[Math.floor(Math.random() * drinksArray.length)];
      var drinksDiv = $("<div>");
      drinksDiv.append(randomDrinkA, randomDrinkB, randomDrinkC);
      $("#drinks-view").html(drinksDiv)
    }
    recipeIngredient = mainIngredient;

    switch (recipeIngredient) {
      case "potatoes":
        var freezingDrinks = ["coffee", "chocolate", "tea"];
        var freezingIndex = [Math.floor(Math.random() * freezingDrinks.length)];
        drinkIngredient = freezingDrinks[freezingIndex];
        break;
      case "beef":
        var freezingDrinks = ["coffee", "chocolate", "tea"];
        var freezingIndex = [Math.floor(Math.random() * freezingDrinks.length)];
        drinkIngredient = freezingDrinks[freezingIndex];
        break;
      case "spinach":
        var freezingDrinks = ["coffee", "chocolate", "tea"];
        var freezingIndex = [Math.floor(Math.random() * freezingDrinks.length)];
        drinkIngredient = freezingDrinks[freezingIndex];
        break;
      case "ginger":
        var coldDrinks = ["bourbon", "brandy", "rum"];
        var coldIndex = [Math.floor(Math.random() * coldDrinks.length)];
        drinkIngredient = coldDrinks[coldIndex];
        break;
      case "nutmeg":
        var coldDrinks = ["bourbon", "brandy", "rum"];
        var coldIndex = [Math.floor(Math.random() * coldDrinks.length)];
        drinkIngredient = coldDrinks[coldIndex];
        break;
      case "mushrooms":
        var coldDrinks = ["bourbon", "brandy", "rum"];
        var coldIndex = [Math.floor(Math.random() * coldDrinks.length)];
        drinkIngredient = coldDrinks[coldIndex];
        break;
      case "garlic":
        var warmDrinks = ["vodka", "gin", "brandy"];
        var warmIndex = [Math.floor(Math.random() * warmDrinks.length)];
        drinkIngredient = warmDrinks[warmIndex];
        break;
      case "carrots":
        var warmDrinks = ["vodka", "gin", "brandy"];
        var warmIndex = [Math.floor(Math.random() * warmDrinks.length)];
        drinkIngredient = warmDrinks[warmIndex];
        break;
      case "white wine":
        var warmDrinks = ["vodka", "gin", "brandy"];
        var warmIndex = [Math.floor(Math.random() * warmDrinks.length)];
        drinkIngredient = warmDrinks[warmIndex];
        break;
      case "tomatoes":
        var hotDrinks = ["ice", "beer", "tequila"];
        var hotIndex = [Math.floor(Math.random() * hotDrinks.length)];
        drinkIngredient = hotDrinks[hotIndex];
        break;
      case "parsley":
        var hotDrinks = ["ice", "beer", "tequila"];
        var hotIndex = [Math.floor(Math.random() * hotDrinks.length)];
        drinkIngredient = hotDrinks[hotIndex];
        break;
      case "leek":
        var hotDrinks = ["ice", "beer", "tequila"];
        var hotIndex = [Math.floor(Math.random() * hotDrinks.length)];
        drinkIngredient = hotDrinks[hotIndex];
        break;
      default:
        drinkIngredient = "milk";
        break;
    }
    getDrinkID();
  });

});