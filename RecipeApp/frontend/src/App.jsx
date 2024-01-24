import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RecipeInput from "./Component/RecipeInput/RecipeInput";
import RecipeList from "./Component/RecipeList/RecipeList";
import RecipeDetail from "./Component/RecipeDetail/RecipeDetail";
import RecipeForm from "./Component/RecipeForm/RecipeForm";
import {
  getAllRecipe,
  toggleFavorite,
  deleteRecipe,
  saveRecipe,
} from "./Api/api";
import "./App.css";

const App = () => {
  const [recipe, setRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [navigate, setNavigate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecipe();

        setRecipe(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterText, showFavoritesOnly) => {
    const filtered = recipe.filter((recipe) => {
      const includesFilter =
        !filterText ||
        recipe.name.toLowerCase().includes(filterText.toLowerCase());
      const isFavorite = !showFavoritesOnly || recipe.isFavorite;

      return includesFilter && isFavorite;
    });

    setFilteredRecipes(filtered);
  };

  const handleToggleFavorite = async (recipeId, isFavorite) => {
    try {
      await toggleFavorite(recipeId, isFavorite);

      const updatedRecipes = recipe.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, isFavorite } : recipe
      );
      setRecipe(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);

      const updatedRecipes = recipe.filter((recipe) => recipe.id !== recipeId);
      setRecipe(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleSaveRecipe = async (newRecipe) => {
    try {
      const savedRecipe = await saveRecipe(newRecipe);
      setRecipe([...recipe, savedRecipe]);
      setFilteredRecipes([...recipe, savedRecipe]);

      setNavigate(`/recipes/${savedRecipe.id}`);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <>
      <RecipeInput onFilterChange={handleFilterChange} navigate={setNavigate} />
      <Routes>
        <Route
          path="/recipes"
          element={
            <RecipeList
              recipes={filteredRecipes}
              onToggleFavorite={handleToggleFavorite}
              onDeleteRecipe={handleDeleteRecipe}
            />
          }
        />
        <Route
          path="/recipes/new"
          element={<RecipeForm onSaveRecipe={handleSaveRecipe} />}
        />
        <Route
          path="/recipes/:recipeId"
          element={<RecipeDetail recipes={recipe} />}
        />
        <Route
          path="/"
          element={
            <RecipeList
              recipes={filteredRecipes}
              onToggleFavorite={handleToggleFavorite}
              onDeleteRecipe={handleDeleteRecipe}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
