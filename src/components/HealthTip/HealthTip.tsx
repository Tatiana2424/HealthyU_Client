// HealthTip.tsx
import React from 'react';
import './HealthTip.scss';

const HealthTip: React.FC = () => {
    return (
        <div className="health-tip-container">
            <img
                src="https://static.wixstatic.com/media/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg/v1/fill/w_980,h_769,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg" // Replace with your image URL
                alt="Healthy Lifestyle"
                className="health-tip-image"
            />
            <div className="health-tip-content">
                <h2>Health Tip of the Day</h2>
                <p>Here's a helpful tip for a healthier lifestyle: Start your day with a glass of water and a 15-minute meditation or stretching routine. This helps to wake up your body, hydrate, and set a calm tone for the rest of the day.</p>
            </div>
        </div>
    );
};

export default HealthTip;
