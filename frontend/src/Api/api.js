import axios from "axios";

const axiosFetchRecipe = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAllRecipe = async () => {
  const { data } = await axiosFetchRecipe(`/recipes`);
  return data;
};

export const toggleFavorite = async (recipeId, isFavorite) => {
  const { data } = await axiosFetchRecipe.put(`/recipes/${recipeId}/favorite`, {
    isFavorite,
  });

  return data;
};

export const deleteRecipe = async (recipeId) => {
  const response = await axiosFetchRecipe.delete(`/recipes/${recipeId}`);
  return response.data;
};

export const saveRecipe = async (recipeData) => {
  const { data } = await axiosFetchRecipe.post(`/recipes`, recipeData);
  return data;
};
