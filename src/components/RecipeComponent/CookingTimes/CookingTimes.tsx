import React from 'react';
import './CookingTimes.scss';
import { RecipeTimeInfo } from '../../../models/Recipe';

interface CookingTimesProps {
    timeInfo: RecipeTimeInfo;
}

const CookingTimes: React.FC<CookingTimesProps> = ({ timeInfo }) => {
    return (
        <div className="cooking-times-component">
            <div className="cooking-times-container">
                <div className="time-item">
                    <strong>Prep Time:</strong>{' '}
                    <span>
                        <p>{timeInfo.prepTime}</p>
                    </span>
                </div>
                <div className="time-item">
                    <strong>Cook Time:</strong>{' '}
                    <span>
                        <p>{timeInfo.cookTime}</p>
                    </span>
                </div>
                <div className="time-item">
                    <strong>Cool Time:</strong>{' '}
                    <span>
                        <p>{timeInfo.coolTime}</p>
                    </span>
                </div>
                <div className="time-item">
                    <strong>Rest Time:</strong>{' '}
                    <span>
                        <p>{timeInfo.restTime}</p>
                    </span>
                </div>
                <div className="time-item">
                    <strong>Total Time:</strong>{' '}
                    <span>
                        <p>{timeInfo.totalTime}</p>
                    </span>
                </div>
                <div className="time-item">
                    <strong>Servings:</strong>{' '}
                    <span>
                        <p>{timeInfo.servings}</p>
                    </span>
                </div>
                <div className="nutrition-link">
                    <a href="#nutrition-facts">Jump to Nutrition Facts</a>
                </div>
            </div>
        </div>
    );
};

export default CookingTimes;
