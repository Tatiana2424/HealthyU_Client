import React, { useState, useEffect } from "react";
import BmiCalculator, {
  BMI,
} from "../BMIComponent/BmiCalculator/BmiCalculator";
import BmiTable from "../BMIComponent/BmiTable/BmiTable";
import axios from "axios";
import { message } from "antd";
import apiService from "../../api/apiService";

interface Props {
  userId: number;
}

export interface BMIData extends BMI {
  key: React.Key;
}

const UserBMI: React.FC<Props> = ({ userId }) => {
  const [bmiData, setBmiData] = useState<BMIData[]>([]);

  const fetchBmiData = async () => {
    try {
      const response = await axios.get<BMIData[]>(
        `https://localhost:7271/api/Bmi/GetByUserId/${userId}`
      );
      const dataWithKeys = response.data.map((item, index) => ({
        ...item,
        key: index,
      }));
      setBmiData(dataWithKeys);
    } catch (error) {
      console.error("There was an error fetching the BMI data:", error);
    }
  };

  useEffect(() => {
    fetchBmiData();
  }, [userId]);

  const handleNewBmiEntry = () => {
    fetchBmiData();
  };

  const handleDeleteBmiEntry = async (id: number) => {
    try {
      await apiService.delete(`/Bmi/Delete/${id}`);
      message.success("BMI entry deleted successfully");
      fetchBmiData();
    } catch (error) {
      message.error("Failed to delete BMI entry");
    }
  };

  return (
    <>
      <BmiCalculator onNewBmiEntry={handleNewBmiEntry} />
      <BmiTable bmiData={bmiData} onDeleteBmiEntry={handleDeleteBmiEntry} />
    </>
  );
};

export default UserBMI;
