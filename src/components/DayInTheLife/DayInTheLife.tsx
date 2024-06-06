// DayInTheLife.tsx
import React, { useState } from 'react';
import './DayInTheLife.scss';

type MealTimes = 'morning' | 'afternoon' | 'evening' | 'snacks';
type MealDescriptions = {
    [time in MealTimes]: string[];
};

const DayInTheLife: React.FC = () => {
    // State for storing and updating meal descriptions
    const [meals, setMeals] = useState<MealDescriptions>({
        morning: [
            "Oatmeal with sliced bananas and a drizzle of honey.",
            "Greek yogurt topped with mixed berries and a sprinkle of granola.",
            "Scrambled eggs with spinach, tomatoes, and whole-grain toast."
        ],
        afternoon: [
            "Grilled chicken salad with mixed greens, cucumbers, and balsamic vinaigrette.",
            "Turkey and avocado wrap with whole-grain tortilla and side of quinoa.",
            "Lentil soup with carrots, onions, and celery served with a side salad."
        ],
        evening: [
            "Baked salmon with roasted asparagus and wild rice.",
            "Stir-fried tofu with broccoli, bell peppers, and teriyaki sauce over brown rice.",
            "Beef and vegetable kebabs with tzatziki sauce and pita bread."
        ],
        snacks: [
            "Sliced apples with almond butter.",
            "Hummus with carrot and cucumber sticks.",
            "A handful of mixed nuts and dried fruit."
        ],
    });
    

    // Function to handle the change of meal descriptions
    const handleMealChange = (
        timeOfDay: MealTimes,
        index: number,
        newValue: string
    ) => {
        setMeals((prevMeals) => {
            const updatedMeals = { ...prevMeals };
            const updatedDescriptions = [...updatedMeals[timeOfDay]];
            updatedDescriptions[index] = newValue;
            updatedMeals[timeOfDay] = updatedDescriptions;
            return updatedMeals;
        });
    };

    return (
        <div className="day-in-the-life">
            <div className="left-side">
                <img
                    src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/02.jpg"
                    alt="Cooking"
                />
            </div>
            <div className="right-side">
                <h1>A Day in the Life</h1>
                <div className="meal-times">
                    {Object.entries(meals).map(([timeOfDay, descriptions]) => (
                        <div className="time-block" key={timeOfDay}>
                            <h2>
                                {timeOfDay.charAt(0).toUpperCase() +
                                    timeOfDay.slice(1)}
                            </h2>
                            {descriptions.map((description, index) => (
                                <p
                                    key={`${timeOfDay}-${index}`}
                                    className='meal-description'
                                    suppressContentEditableWarning
                                    onBlur={(e) =>
                                        handleMealChange(
                                            timeOfDay as MealTimes,
                                            index,
                                            e.currentTarget.textContent || ''
                                        )
                                    }
                                >
                                    {description}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayInTheLife;
