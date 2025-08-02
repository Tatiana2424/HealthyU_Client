import React from "react";
import "./IngredientsList.scss";
import { RecipeIngredient } from "../../../models/Recipe";

type IngredientsListProps = {
  ingredients: RecipeIngredient[];
};

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const sortedIngredients = [...ingredients].sort(
    (a, b) => a.position - b.position
  );
  return (
    <div className="ingredients-list-component">
      <div className="ingredients-list">
        <h2>Ingredients</h2>
        <ul>
          {sortedIngredients.map((ingredient, index) => (
            <li key={index}>
              <span>{ingredient.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsList;
