export interface Image {
    id: number;
    url: string;
    title?: string;
    alt?: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface RecipeNutrition {
    id: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    fiber: number;
  }
  
  export interface RecipeUserRating {
    id: number;
    countPositive: number;
    countNegative: number;
    score: number;
  }
  
  export interface RecipeIngredient {
    id: number;
    name: string;
    position: number;
  }
  
  export interface RecipeInstruction {
    id: number;
    displayText: string;
    position: number;
  }
  
  export interface RecipeTimeInfo {
    id: number;
    prepTime: string; // in minutes
    cookTime: string; // in minutes
    totalTime: string; // in minutes
    servings: number; // number of servings
    restTime: string;
    coolTime: string;
  }
  
  export interface RecipeSearchKeyword {
    id: number;
    keyword: string;
  }
  
  export interface Recipe {
    id: number;
    name: string;
    description: string;
    videoUrl?: string;
    imageId?: number;
    image?: Image;
    isPublished: boolean;
    userId?: number;
    user?: User;
    recipeNutrition?: RecipeNutrition;
    recipeUserRating?: RecipeUserRating;
    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];
    timeInfo?: RecipeTimeInfo;
    searchKeywords: RecipeSearchKeyword[];
  }