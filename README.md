# wEATherly

A web application that generates recipes and beverages based on your weather/location.

## How It Works

* User enters a location (city, two-letter country code) into the form field and clicks the Submit button
* Upon clicking Submit button, the location is placed in a parameter in an AJAX “GET” call to the OpenWeatherMap API
* The Weather Underground API returns a JSON object with information about the current weather at your location. This information will display as text on the results page.
* Likewise upon clicking Submit the temperature information is used to retrieve matching recipes from the MealsDB API. 
* Matching recipes are categorized according to seasonal ingredients to match ranges of temperatures. 
* The app will likewise retrieve cocktail recipes, which are categorized according to types of liquors to match ingredients returned in the recipe response.
 

## Motivation

To help users decide on what to eat and drink, according to the weather.
Great if you are indecisive or looking for inspiration to cook.

## Built With

* jQuery
* APIs
* AJAX
* JSON
* Javascript
* Bootstrap
* CSS
* HTML

## Credits

We referenced the following resources for this project:

* Penn LPS Coding Bootcamp Course Material
* OpenWeatherMap API https://openweathermap.org/api
* The MealDB API https://www.themealdb.com/api.php
* TheCocktailDB API https://www.thecocktaildb.com/api.php

## License

&copy; 2019 Maura Fortino, Alex Briody, Cat Gomez, Ky O'Brien, Alissa Yamazaki


