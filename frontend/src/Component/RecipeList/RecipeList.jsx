import PropTypes from "prop-types";

import style from "./RecipeList.module.css";
import RecipeItem from "../RecipeItem/RecipeItem";

export default function RecipeList({
  recipes,
  onToggleFavorite,
  onDeleteRecipe,
}) {
  return (
    <ul className={style.list}>
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
          onDeleteRecipe={onDeleteRecipe}
        />
      ))}
    </ul>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.array,
  onToggleFavorite: PropTypes.func.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
};
