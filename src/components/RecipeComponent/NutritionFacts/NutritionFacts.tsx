import React from "react";
import "./NutritionFacts.scss";
import { RecipeNutrition } from "../../../models/Recipe";

type NutritionFactsProps = {
  nutrition: RecipeNutrition;
};

const NutritionFacts: React.FC<NutritionFactsProps> = ({ nutrition }) => {
  return (
    <div className="nutrition-facts">
      <h2>
        Nutrition Facts <span>(per serving)</span>
      </h2>
      <table>
        <tbody>
          <tr>
            <td>{nutrition.calories}</td>
            <td>{nutrition.fat}g</td>
            <td>{nutrition.carbohydrates}g</td>
            <td>{nutrition.protein}g</td>
            <td>{nutrition.fiber}</td>
          </tr>
          <tr>
            <th>Calories</th>
            <th>Fat</th>
            <th>Carbs</th>
            <th>Protein</th>
            <th>Fiber</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NutritionFacts;
