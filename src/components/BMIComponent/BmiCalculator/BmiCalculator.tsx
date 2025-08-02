import React, { useState, useEffect } from "react";
import "./BmiCalculator.scss";
import GaugeChart from "react-gauge-chart";
import BmiClassification from "../BmiClassification/BmiClassification";
import apiService from "../../../api/apiService";

export interface BMI {
  id?: number;
  height: number;
  weight: number;
  bmi: number;
  dataTime?: string;
  classification?: string;
  userId: number | null;
}

interface BmiCalculatorProps {
  onNewBmiEntry?: () => void;
}

const BmiCalculator: React.FC<BmiCalculatorProps> = ({ onNewBmiEntry }) => {
  const [heightValue, setHeightValue] = useState<string>("");
  const [weightValue, setWeightValue] = useState<string>("");
  const [bmiValue, setBmiValue] = useState<number>(0);
  const [bmiMessage, setBmiMessage] = useState<string>("");
  const [gaugePercent, setGaugePercent] = useState<number>(0);
  const userId = sessionStorage.getItem("userId");

  const createBmi = async (bmiData: BMI) => {
    if (userId) {
      try {
        await apiService.post("/Bmi/Create", bmiData);
        onNewBmiEntry?.();
      } catch (error) {
        console.error("Error creating BMI:", error);
      }
    }
  };

  useEffect(() => {
    const minBmi = 10;
    const maxBmi = 40;
    const percent = (bmiValue - minBmi) / (maxBmi - minBmi);
    setGaugePercent(Math.min(Math.max(percent, 0), 1));
  }, [bmiValue]);

  const calculateBmi = () => {
    if (heightValue && weightValue) {
      const heightInMeters = parseInt(heightValue) / 100;
      const bmi = parseInt(weightValue) / (heightInMeters * heightInMeters);
      setBmiValue(bmi);

      let classification = "";
      if (bmi < 18.5) {
        classification = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        classification = "Normal weight";
      } else if (bmi >= 25 && bmi < 30) {
        classification = "Overweight";
      } else {
        classification = "Obese";
      }
      setBmiMessage(classification);

      const bmiData: BMI = {
        id: 0,
        height: parseFloat(heightValue),
        weight: parseFloat(weightValue),
        bmi: Number(bmi.toFixed(2)),
        classification,
        userId: Number(userId),
      };

      createBmi(bmiData);
    } else {
      setBmiValue(0);
      setBmiMessage("");
    }
  };

  const getDescriptionAndTips = (classification: string) => {
    switch (classification) {
      case "Underweight":
        return {
          description:
            "A BMI of less than 18.5 suggests that you may be underweight. Being underweight can be associated with certain health risks, including nutritional deficiencies and osteoporosis.",
          tips: "Consider nutrient-rich foods that are high in calories. Nut butters, whole grains, and starchy vegetables can add calories and nutrients to your diet. It might be helpful to eat smaller, frequent meals. However, always consult with a healthcare professional before making any significant changes to your diet or lifestyle.",
        };
      case "Normal weight":
        return {
          description:
            "A BMI between 18.5 and 24.9 is generally considered a healthy weight range. This range is associated with the lowest health risks and is typically used as a standard goal in dietary and health recommendations.",
          tips: "Maintain your current eating habits, focusing on a diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Regular physical activity can also help to maintain a healthy weight and improve overall health. Continue to monitor your weight and BMI to ensure it remains within this range.",
        };
      case "Overweight":
        return {
          description:
            "A BMI between 25 and 29.9 indicates that you may be overweight. Being overweight can increase your risk of various health issues, such as heart disease, diabetes, and high blood pressure.",
          tips: "Adopting a diet with fewer calories and increasing your level of physical activity can be beneficial. Emphasize whole foods, such as vegetables, fruits, and whole grains, and limit your intake of sugary snacks and high-fat foods. Regular exercise, such as brisk walking, swimming, or cycling, can help burn excess calories. It is also advisable to consult a healthcare professional for personalized guidance.",
        };
      case "Obese":
        return {
          description:
            "A BMI of 30 or above falls into the obese category. Obesity is linked to a higher risk of serious health conditions, including type 2 diabetes, heart disease, and certain cancers.",
          tips: "Implementing a comprehensive lifestyle change is usually required to achieve and maintain significant weight loss. This may include a structured diet plan, increased physical activity, and possibly behavioral therapy or medication. Professional guidance from dietitians, therapists, and possibly medical intervention may also be considered. Gradual, steady weight loss through sustainable changes is more beneficial than extreme, rapid loss.",
        };
      default:
        return {
          description:
            "Enter your height and weight to calculate your BMI and see your classification.",
          tips: "",
        };
    }
  };

  const { description, tips } = getDescriptionAndTips(bmiMessage);

  return (
    <>
      <div className="bmi-calculator-container">
        <div>
          <GaugeChart
            id="gauge-chart3"
            nrOfLevels={3}
            colors={["#00BFFF", "green", "red"]}
            arcWidth={0.3}
            percent={gaugePercent}
            textColor={"black"}
            hideText={true}
          />
        </div>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
            />
          </div>
        </div>

        <button className="calculate-btn" onClick={calculateBmi}>
          Click to Calculate BMI
        </button>
      </div>
      <div className="bmi-calculator-result">
        {bmiValue !== 0 && bmiMessage && (
          <>
            <div className="result">
              <p className="bmi-value-highlight">
                Your BMI: <span>{bmiValue.toFixed(2)}</span>
              </p>
              <BmiClassification bmi={bmiValue} />
            </div>
            <div className="bmi-description">
              <p>{description}</p>
              {tips && <p className="bmi-tips">{tips}</p>}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BmiCalculator;
