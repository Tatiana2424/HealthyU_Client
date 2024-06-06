import React, { useEffect, useRef, useState } from 'react';
import './RecipePage.scss';
import Banner from '../../components/common/Banner/Banner';
import PrinterOutlined from '@ant-design/icons/lib/icons/PrinterOutlined';
import ShareAltOutlined from '@ant-design/icons/lib/icons/ShareAltOutlined';
import CookingTimes from '../../components/RecipeComponent/CookingTimes/CookingTimes';
import IngredientsList from '../../components/RecipeComponent/IngredientsList/IngredientsList';
import Instructions from '../../components/RecipeComponent/Instructions/Instructions';
import NutritionFacts from '../../components/RecipeComponent/NutritionFacts/NutritionFacts';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import RecipeList from '../../components/RecipeComponent/RecipeList/RecipeList';
import { sampleRecipes } from '../../store/RecipeCard';
import { useNavigate, useParams } from 'react-router-dom';
import { Recipe } from '../../models/Recipe';
import apiService from '../../api/apiService';

type RecipePageProps = {
    title?: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
};

const RecipePage: React.FC<RecipePageProps> = ({
    title,
    description,
    imageUrl,
    videoUrl,
}) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe>();
    const titleRef = useRef<HTMLHeadingElement>(null); 

    const handlePrint = () => {
        window.print();
    };
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Recipe: ${title}`,
                text: description,
                url: window.location.href,
            });
        } else {

        }
    };
    const handleEntryRecipeClick = (id: number) => {
        navigate(`/recipe/${id}`);
    };

    useEffect(() => {
        const fetchedRecipes = async () => {
            try {
                const fetchedRecipes = await apiService.get<Recipe[]>(
                    'https://localhost:7271/api/Recipe/GetAllBasePublishedRecipeData'
                );
                console.log('fetchedRecipes', fetchedRecipes);
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.error('Failed to fetch articles', error);
            }
        };

        fetchedRecipes();
    }, []);

    useEffect(() => {
        const fetchRecipeById = async (id: any) => {
            try {
                const url = `https://localhost:7271/api/Recipe/GetById?id=${id}`;
                const fetchedRecipe = await apiService.get<Recipe>(url);
                console.log('fetchedRecipe', fetchedRecipe);
                setRecipe(fetchedRecipe);
            } catch (error) {
                console.error('Failed to fetch recipe by ID', error);
            }
        };

        if (id !== undefined) {
            const recipeId = parseInt(id, 10);
            if (!isNaN(recipeId)) {
                fetchRecipeById(recipeId);
            } else {
                console.error('Invalid recipe ID:', id);
            }
        }
    }, [id]);

    useEffect(() => {
        if (recipe && titleRef.current) {
            titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [recipe]);

    return (
        <div ref={titleRef}>
            <Banner
                title={recipe?.name}
                description="Enjoy the best recipes."
                bannerImageUrl={recipe?.image?.url ?? 'hh'}
                //"https://images.squarespace-cdn.com/content/v1/57d60d6620099e97b49234c6/1681936677350-95GXJ839ARD78N41O8IH/blog+covers+%281%29.png?format=2500w"
                alignment="center"
                bannerHeight={400}
                isDarken={true}
                bannerMarginTop={50}
            />
            <div className="recipe-page">
                <h1 className="title">{recipe?.name}</h1>
                <p className="description">{recipe?.description}</p>
                <div className="actions no-print">
                    <button onClick={handlePrint}>
                        <span className="no-print">Print</span>
                        <PrinterOutlined />
                    </button>
                    <button onClick={handleShare}>
                        <span className="no-print">Share</span>
                        <ShareAltOutlined />
                    </button>
                </div>
                {/* {imageUrl && (
                    <img src={imageUrl} alt={title} className="recipe-image" />
                )} */}
                {videoUrl && (
                    <video
                        controls
                        src={recipe?.videoUrl}
                        className="recipe-video no-print"
                    />
                )}

                {recipe?.timeInfo && (
                    <CookingTimes timeInfo={recipe?.timeInfo} />
                )}

                {recipe?.ingredients && (
                    <IngredientsList ingredients={recipe?.ingredients} />
                )}

                {recipe?.instructions && (
                    <Instructions
                        instructions={recipe?.instructions}
                        imageUrl={recipe?.image?.url ?? 'test'}
                        title={recipe?.name ?? 'test'}
                    />
                )}

                {recipe?.recipeNutrition && (
                    <NutritionFacts nutrition={recipe?.recipeNutrition} />
                )}

                <SearchComponent title="Not what you're looking for?" />
                <br />
                <br />
                <RecipeList
                    recipes={recipes.filter(
                        (entry) => entry.id.toString() !== id
                    )}
                    onEntryClick={handleEntryRecipeClick}
                />
                <br />
                <br />
            </div>
        </div>
    );
};

export default RecipePage;
