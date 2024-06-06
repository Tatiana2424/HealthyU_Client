import React, { useState, useEffect, useCallback } from 'react';
import BmiCalculator, {
    BMI,
} from '../BMIComponent/BmiCalculator/BmiCalculator';
import BmiTable from '../BMIComponent/BmiTable/BmiTable';
import axios from 'axios';
import { message } from 'antd';

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
            console.error('There was an error fetching the BMI data:', error);
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
            await axios.delete(`https://localhost:7271/api/Bmi/Delete/${id}`);
            message.success('BMI entry deleted successfully');
            fetchBmiData(); // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete BMI entry:', error);
            message.error('Failed to delete BMI entry');
        }
    };

    return (
        <>
            <BmiCalculator onNewBmiEntry={handleNewBmiEntry} />
            <BmiTable
                bmiData={bmiData}
                onDeleteBmiEntry={handleDeleteBmiEntry}
            />
        </>
    );
};

export default UserBMI;
