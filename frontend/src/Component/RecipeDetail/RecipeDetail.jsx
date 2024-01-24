import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import style from "./RecipeDetail.module.css";

const RecipeDetail = ({ recipes }) => {
  const { recipeId } = useParams();
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.recipe}>
       <img src="/essen.jpg" alt="food" width="200" height="150" /> 
        <h2>{recipe.name}</h2>
        <p>Instructions: {recipe.instructions}</p>
        <p>Calories per 100g: {recipe.calories100g} kcal</p>
        <p>Total Cooking Time: {recipe.totalCookingTimeMinutes} minutes</p>
        
        <Link to="/" className={style.backButton}>
          Back Home
        </Link>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipes: PropTypes.array,
};

export default RecipeDetail;
