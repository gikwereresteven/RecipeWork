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
        <h2>{recipe.name}</h2>
        <p>Instructions: {recipe.instructions}</p>
        <div class="container">
  <div class="row">
    <div class="col">
    <p>Calories per 100g: {recipe.calories100g} kcal</p>
    </div>
    
    <div class="col">
    <p>Total Cooking Time: {recipe.totalCookingTimeMinutes} minutes</p>
    </div>
  </div>
</div>
       
       
        
        <Link to="/" className={style.backButton}>
          Back home
        </Link>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipes: PropTypes.array,
};

export default RecipeDetail;
