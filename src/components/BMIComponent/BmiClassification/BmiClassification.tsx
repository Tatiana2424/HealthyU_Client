import React from "react";
import "./BmiClassification.scss";

const BmiClassification: React.FC<{ bmi: number }> = ({ bmi }) => {
  return (
    <div className="bmi-classification-container">
      <div className={`classification-item ${bmi < 18.5 ? "blue" : ""}`}>
        Underweight: <span>less than 18.5</span>
      </div>
      <div
        className={`classification-item ${
          bmi >= 18.5 && bmi < 25 ? "green" : ""
        }`}
      >
        Normal weight: <span>18.5 - 24.9</span>
      </div>
      <div
        className={`classification-item ${
          bmi >= 25 && bmi < 30 ? "orange" : ""
        }`}
      >
        Overweight: <span>25 - 29.9</span>
      </div>
      <div className={`classification-item ${bmi >= 30 ? "red" : ""}`}>
        Obesity: <span>30 or more</span>
      </div>
    </div>
  );
};

export default BmiClassification;
