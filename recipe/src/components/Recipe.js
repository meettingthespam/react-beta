import React from "react";

// using a CSS module, importing from custom built
// syntax is similar to react html/js
// <div className={style.recipe}>
import style from "../modules/recipe.module.css";

/*using deconstruction, we can pass the title, calories and image
from the setRecipes (useState) component and pass them as parameters
in the main app

(so the way I see components are just empty vessels to display
something from the state (either set globaly or in the main app ))

Note: the image source is not a string (because the raw json data
already has it as a string)

notice the syntax for looping over the ingedients to have a self
generating unordered list


note about using {} in Javascript, if you're passing a variable
that is dynamically updating, you can apply methods direcly to it
(instead of having them passed through a function or something else)
e.g
    <p>Calories: {calories.toFixed(0)}</p>
without the .toFixed() method, the calories will be
floating poit numbers with a possible (~10 digits)
.toFixed() fixes the amount of floating point numbers

 */
const RecipeComponent = ({ title, calories, image, ingredients }) => {


  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient}</li>
        ))}
      </ul>
      <p>Calories: {calories.toFixed(0)}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};
export default RecipeComponent;
