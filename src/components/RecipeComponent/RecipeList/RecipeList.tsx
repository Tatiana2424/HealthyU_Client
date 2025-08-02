import React from "react";
import { Recipe } from "../../../models/Recipe";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeList.scss";

type RecipeListProps = {
  recipes: Recipe[];
  onEntryClick: (id: number) => void;
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onEntryClick }) => {
  const handleClick = (id: number) => {
    onEntryClick(id);
  };

  return (
    <div className="recipe-list no-print">
      {recipes.map((recipe) => (
        <RecipeCard
          id={recipe.id}
          title={recipe.name}
          rating={recipe.recipeUserRating?.score ?? 4}
          totalRatings={recipe.recipeUserRating?.score}
          imageUrl={recipe?.image?.url ?? "/test"}
          onClick={() => handleClick(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
