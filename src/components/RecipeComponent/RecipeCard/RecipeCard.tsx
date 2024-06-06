// RecipeCard.tsx
import React from 'react';
import './RecipeCard.scss';

type RecipeCardProps = {
    id: number;
    title: string;
    rating: number;
    totalRatings?: number;
    imageUrl: string;
    onClick: (id: number) => void; 
};

const RecipeCard: React.FC<RecipeCardProps> = ({
    id,
    title,
    rating,
    totalRatings,
    imageUrl,
    onClick
}) => {
    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < rating ? 'star filled' : 'star'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="recipe-card" onClick={() => onClick(id)}>
            <div className="recipe-image">
                <img src={imageUrl} alt={title} />
                {/* <button className="favorite-button">❤</button> */}
            </div>
            <div className="recipe-info">
                {/* <span className="recipe-category">{category}</span> */}
                <h3 className="recipe-title">{title}</h3>
                <div className="recipe-rating">
                    {renderStars()}
                    {totalRatings && (
                        <span className="total-ratings">
                            {totalRatings} Ratings
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
