import React, { useEffect, useRef, useState } from "react";
import Banner from "../../components/common/Banner/Banner";
import "./SearchPage.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import RecipeList from "../../components/RecipeComponent/RecipeList/RecipeList";
import apiService from "../../api/apiService";
import { Recipe } from "../../models/Recipe";
const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("term") ?? "";
  const [recipe, setRecipe] = useState<Recipe[]>([]);
  const searchRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (recipe && searchRef.current) {
      searchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [recipe]);

  useEffect(() => {
    const fetchedRecipes = async () => {
      if (!searchTerm) return;
      try {
        const fetchedRecipes = await apiService.get<Recipe[]>(
          `/Recipe/GetBySearchKeyword?searchKeyword=${encodeURIComponent(
            searchTerm
          )}`
        );
        setRecipe(fetchedRecipes);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      }
    };

    fetchedRecipes();
  }, [searchTerm]);

  const handleEntryRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="search-page">
      <Banner
        bannerHeight={300}
        title="Search"
        bannerImageUrl="https://static.wixstatic.com/media/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg/v1/fill/w_980,h_769,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg"
        alignment="center"
        isDarken={true}
        bannerMarginTop={80}
      />
      <div className="search-component" ref={searchRef}>
        <SearchComponent searchTerm={searchTerm} />
      </div>
      <RecipeList recipes={recipe} onEntryClick={handleEntryRecipeClick} />
    </div>
  );
};

export default SearchPage;
