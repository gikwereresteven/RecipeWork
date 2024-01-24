import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import starFavorite from "../../assets/starFavorite.svg";
import starNoFavorite from "../../assets/starNoFavorite.svg";
import style from "./RecipeItem.module.css";
import Button from "./../Button/Button";

const RecipeItem = ({ recipe, onToggleFavorite, onDeleteRecipe }) => (
  <li className={style.list}>
    <div className={style.header}>
      <h3 className={style.name}>{recipe.name}</h3>
      <div className={style.icons}>
        <img
          className={style.starIcon}
          src={recipe.isFavorite ? starFavorite : starNoFavorite}
          alt="star"
          onClick={() => onToggleFavorite(recipe.id, !recipe.isFavorite)}
        />
      </div>
    </div>
    <p className={style.instructions}>{recipe.instructions}</p>
    <p className={style.calories100g}>{recipe.calories100g} kcal/100g</p>
    <p className={style.totalCookingTimeMinutes}>
      {recipe.totalCookingTimeMinutes} minute
    </p>
    <div className={style.container_btn}>
      <Link to={`/recipes/${recipe.id}`}>
        <Button text="Show Recipe" />
      </Link>
      <FaTrash
        className={style.trashIcon}
        onClick={() => onDeleteRecipe(recipe.id)}
      />
    </div>
  </li>
);

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    instructions: PropTypes.string,
    isFavorite: PropTypes.bool,
    calories100g: PropTypes.number,
    totalCookingTimeMinutes: PropTypes.number,
  }).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
};

export default RecipeItem;
