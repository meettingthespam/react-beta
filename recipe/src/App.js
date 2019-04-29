import React, { useEffect, useState } from "react";
import "./App.css";
import RecipeComponent from "./components/Recipe";
import NavBar from "./components/Navbar"

// using edamam api for the recipe search,
// https://developer.edamam.com/
// under documentation, there's code snippets
// https://developer.edamam.com/edamam-docs-recipe-api

const App = () => {
  // connecting to the api from Edama
  // MAKE SURE TO USE ENVIRONMENT TOOLS BEFORE PUSHING THIS
  const APP_ID = "327c32d4";
  const APP_KEY = "75254bb7a04496e6222370c47226a29c";

  // setting the state for the recipes
  const [recipes, setRecipes] = useState([]);

  // setting the state for the search
  /* for the search, set it to an empty string,
  just like other search bars, but then add the {search}
  to the value of the search-bar input
  */
  const [search, setSearch] = useState("");

  /*
  due to the way the onChange function works, it updates upon EVERY KEY PRESS,
  and since we're pinging an API, we really don't want this.

  you can see this by console logging the {search}

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }
  */

  // updating search, only when the search button is clicked
  // with a default of "banana"
  const [searchQuery, setSearchQuery] = useState("banana");
  /*
https://reactjs.org/docs/hooks-effect.html
useEffect runs automatically when the site loads,
if you want it to just run once, then you can add an empty array
as the second parameter.

using useEffect to run the api request


once you have the searchQuery set up, we can pass that to the te useEffect's
second parameter, so you can have it only render what is searched (with a default of
brusselsprouts)
*/
  useEffect(
    () => {
      getRecipes();
    },
    [searchQuery]
  );

  /*
 splitting up the functions for the async request,
 instead of putting it directly in the useEffect fucntion
 since our api calls are not instant
 (and we're using a 3rd party so we honestly don't know how long)
 , we need to use await
 before fetching the api call

 then we'll take the response we get and convert it json data
 NOTE: make sure to await on the conversion from the json
 data conversion (because it'll try to do the next step while waiting for the data,
and if no data is in, it'll crash trying to convert missing data )

 alternative way to run this, would be (in pseudo code)
 fetch('http:api_call').then(response => response.json))

 you can console log the converted json data and we can see
 a ton of recipes in the terminal. upon further inspection,
 we can see that the recipes are contained in a array called
 "hits" (the other parts of the json data are just the users' api, ect)

so we'll store the hits array in the json converted data in the state
for the app (in the setRecipes variable) with setState() (this is new, react hooks)


*/

  // displaying the recipe
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  // getting the search request
  // (every time you run this function, you'll get this event)
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  /*
 submitting the search from the search bar, only
 allowing to run once it actually gets submitted
 (stopping the page refresh to prevent mutliple searchQuerySearch pings by
 setting the event to preventing default)
 and then updating the setSearchQuery to the actual search

  setSearch('');
 setting the search to an empty string afterwards (this allows the user to
search for something again without having to delete the parameter)
*/
  const getSearch = e => {
    e.preventDefault();
    setSearchQuery(search);
    setSearch('');
  };

  return (
    <div className="App">

    <NavBar />
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
        <div className="recipe-list">
            {recipes.map(recipe => (
              <RecipeComponent
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredientLines}
              />
            ))}
        </div>
    </div>
  );
};
export default App;
