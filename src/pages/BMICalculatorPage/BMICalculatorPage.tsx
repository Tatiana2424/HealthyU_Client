import React, { useState, useEffect, useCallback } from 'react';
import BmiCalculator from '../../components/BMIComponent/BmiCalculator/BmiCalculator';
import Banner from '../../components/common/Banner/Banner';

const BMICalculatorPage: React.FC = () => {
    return (
        <>
            <Banner
                bannerImageUrl="https://img.freepik.com/free-photo/acai-bowl-with-healthy-berries-kiwi-avocado-tropical-palm-leaf-healthy-vegetarian-food_273443-2722.jpg"
                alignment="center"
                isDarken={true}
                bannerHeight={300}
                title='BMI Calculator'
                bannerMarginTop={100}
            />
            <br/>
            <br/>
            <BmiCalculator />
        </>
    );
};

export default BMICalculatorPage;
