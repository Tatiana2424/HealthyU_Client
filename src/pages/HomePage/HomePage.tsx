import React, { useEffect, useState } from 'react';
import Banner from '../../components/common/Banner/Banner';
import BmiCalculator from '../../components/BMIComponent/BmiCalculator/BmiCalculator';
import DayInTheLife from '../../components/DayInTheLife/DayInTheLife';
import BlogComponent, {
    BlogEntry,
} from '../../components/BlogComponent/BlogComponent';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import RecipeList from '../../components/RecipeComponent/RecipeList/RecipeList';
import { sampleRecipes } from '../../store/RecipeCard';
import apiService from '../../api/apiService';
import { Recipe } from '../../models/Recipe';
import './HomePage.scss';
import FormattedTextComponent from '../../components/FormattedTextComponent/FormattedTextComponent';
import HealthTip from '../../components/HealthTip/HealthTip';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [articles, setArticles] = useState<BlogEntry[]>([]);
    const [recipe, setRecipe] = useState<Recipe[]>([]);
    const yourTextFromAPI =
        "Certainly! Here are some tips for healthy eating:\n\n1. Eat a **Variety of Foods**: Include a wide range of fruits, vegetables, whole grains, lean proteins, and healthy fats in your diet to ensure you get a variety of nutrients.\n\n2. Watch Portion Sizes: Be mindful of portion sizes to avoid overeating. Use smaller plates, bowls, and cups to help control portions.\n\n3. Limit Processed Foods: Try to minimize your intake of processed foods high in added sugars, salt, and unhealthy fats. Opt for whole, unprocessed foods whenever possible.\n\n4. Stay Hydrated: Drink plenty of water throughout the day. Limit sugary drinks and opt for water, herbal teas, or infused water instead.\n\n5. Balance Your Plate: Aim to fill half your plate with fruits and vegetables, one-quarter with lean protein, and one-quarter with whole grains.\n\n6. Snack Smart: Choose healthy snacks like fruits, vegetables, nuts, or yogurt instead of processed snacks high in sugar and unhealthy fats.\n\n7. Cook at Home: Cooking at home allows you to control the ingredients and cooking methods, making it easier to eat healthier.\n\n8. Read Labels: Pay attention to food labels and ingredients lists to make informed choices about the foods you consume.\n\n9. Practice Mindful Eating: Eat slowly, savor your food, and pay attention to hunger and fullness cues to prevent overeating.\n\n10. Plan Ahead: Plan your meals and snacks in advance to avoid impulsive, unhealthy choices when you're hungry.\n\nRemember, healthy eating is about balance and moderation. It's important to enjoy your food while nourishing your body with the nutrients it needs.";

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await apiService.get<BlogEntry[]>(
                    'https://localhost:7271/api/Article/GetAll'
                );
                console.log('fetchedArticles', fetchedArticles);
                console.log('fetchedArticles', fetchedArticles);
                setArticles(fetchedArticles);
            } catch (error) {
                console.error('Failed to fetch articles', error);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        const fetchedRecipes = async () => {
            try {
                const fetchedRecipes = await apiService.get<Recipe[]>(
                    'https://localhost:7271/api/Recipe/GetAllBasePublishedRecipeData'
                );
                console.log('fetchedRecipes', fetchedRecipes);
                setRecipe(fetchedRecipes);
            } catch (error) {
                console.error('Failed to fetch articles', error);
            }
        };

        fetchedRecipes();
    }, []);

    const handleEntryArticleClick = (id: string) => {
        navigate(`/blog/${id}`);
    };

    const handleEntryRecipeClick = (id: number) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <div className="home-page">
            <Banner
                title="Welcome to HealthyU"
                description="Discover our range of services and what we can do for you today."
                bannerImageUrl="https://static.wixstatic.com/media/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg/v1/fill/w_980,h_769,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg"
                alignment="center"
                isDarken={true}
            />
            <div className="spacer" />
            <DayInTheLife />
            <div className="spacer" />
            <BlogComponent
                entries={articles}
                onEntryClick={handleEntryArticleClick}
            />
            <div className="spacer" />
            <Banner
                title="Health Tip of the Day"
                description="Start your day with a glass of water and a 15-minute meditation or stretching routine. This helps to wake up your body, hydrate, and set a calm tone for the rest of the day."
                bannerImageUrl="https://images.immediate.co.uk/production/volatile/sites/30/2017/03/Lemon-water-glass-c14148e.jpg"
                alignment="left"
                isDarken={true}
                bannerHeight={300}
            />
            <div className="spacer" />
            <SearchComponent />
            <div className="spacer" />
            <RecipeList
                recipes={recipe}
                onEntryClick={handleEntryRecipeClick}
            />
            <div className="spacer" />
        </div>
    );
};

export default HomePage;
