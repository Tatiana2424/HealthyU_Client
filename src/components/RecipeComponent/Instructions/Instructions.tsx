import React from 'react';
import './Instructions.scss';
import { RecipeInstruction } from '../../../models/Recipe';

type InstructionsProps = {
    imageUrl: string;
    instructions: RecipeInstruction[];
    title: string;
};

const Instructions: React.FC<InstructionsProps> = ({
    instructions,
    imageUrl,
    title,
}) => {
    const sortedIngredients = [...instructions].sort((a, b) => a.position - b.position);
    return (
        <div className="instructions">
            <h2>Directions</h2>
            {sortedIngredients.map((instruction, index) => (
                <div key={index} className="step">
                    <strong>Step {instruction?.position}</strong>
                    <p>{instruction?.displayText}</p>
                </div>
            ))}
            <div className="recipe-image">
                {imageUrl && (
                    <img src={imageUrl} alt={title} />
                )}
            </div>
        </div>
    );
};

export default Instructions;
