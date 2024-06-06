import Footer from './components/Footer/Foorer';
import './styles/main.scss';
import './styles/_custom.scss';
import './styles/utilities/_mixins.scss';
import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import BlogPage from './pages/BlogPage/BlogPage';
import RecipePage from './pages/RecipePage/RecipePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { AuthProvider } from './context/AuthProvider';
import SearchPage from './pages/Search/SearchPage';
import ChatPage from './pages/ChatPage/ChatPage';
import BMICalculatorPage from './pages/BMICalculatorPage/BMICalculatorPage';
import AboutUs from './pages/AboutUsPage/AboutUs';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/sing-in" element={<SignInPage />} />
                    <Route path="/sing-up" element={<SignUpPage />} />
                    <Route path="/blog/:id" element={<BlogPage />} />
                    <Route path="/chat-page" element={<ChatPage />} />
                    <Route path="/bmi-page" element={<BMICalculatorPage />} />
                    <Route path="/recipe/:id" element={<RecipePage />} />
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route
                        path="/recipe-page"
                        element={
                            <RecipePage
                                title={'Cheeseburger Garbage Bread'}
                                description={
                                    'This cheeseburger garbage bread is absolutely perfect for when you’re having a party. Garbage bread is what we used to call stromboli, and it’s so versatile because you basically can throw anything in it and it will taste amazing. Here, all the elements of a bacon cheeseburger, right down to the dill pickle, are rolled in thin pizza dough, baked until golden brown, and sliced into gorgeous spirals. Its great as-is, but were including an optional secret sauce recipe to serve alongside.'
                                }
                                imageUrl={
                                    'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216182.jpg'
                                }
                                videoUrl={
                                    'https://s3.amazonaws.com/video-api-prod/assets/85b5dc4294914e6b80ba2f128aaaa023/FB.mp4'
                                }
                            />
                        }
                    />
                    {/* <Route path="/about" element={<AboutPage />} /> */}
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
