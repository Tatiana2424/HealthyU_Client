import React, { useEffect, useState } from 'react';
import Banner from '../../components/common/Banner/Banner';
import DayInTheLife from '../../components/DayInTheLife/DayInTheLife';
import BlogComponent, {
    BlogEntry,
} from '../../components/BlogComponent/BlogComponent';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import RecipeList from '../../components/RecipeComponent/RecipeList/RecipeList';
import apiService from '../../api/apiService';
import { Recipe } from '../../models/Recipe';
import './HomePage.scss';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [articles, setArticles] = useState<BlogEntry[]>([]);
    const [recipe, setRecipe] = useState<Recipe[]>([]);

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
