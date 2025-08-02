import React from "react";
import { Space, Table } from "antd";
import { BMIData } from "../../UserBMI/UserBMI";

const { Column } = Table;

interface BmiTableProps {
  bmiData: BMIData[];
  onDeleteBmiEntry: (id: number) => Promise<void>;
}

const BmiTable: React.FC<BmiTableProps> = ({ bmiData, onDeleteBmiEntry }) => {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Underweight":
        return "#05a4da";
      case "Normal weight":
        return "green";
      case "Overweight":
        return "#ffc107";
      case "Obese":
        return "red";
      default:
        return "#000000";
    }
  };

  return (
    <Table dataSource={bmiData}>
      <Column title="Height" dataIndex="height" key="height" />
      <Column title="Weight" dataIndex="weight" key="weight" />
      <Column title="BMI" dataIndex="bmi" key="bmi" />
      <Column
        title="Classification"
        dataIndex="classification"
        key="classification"
        render={(text: string) => (
          <span
            style={{ color: getClassificationColor(text), fontWeight: 500 }}
          >
            {text}
          </span>
        )}
      />
      <Column title="Date" dataIndex="dateTime" key="dateTime" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: BMIData) => (
          <Space size="middle">
            <span className="delete-button">
              <button onClick={() => onDeleteBmiEntry(Number(record.id))}>
                Delete
              </button>
            </span>
          </Space>
        )}
      />
    </Table>
  );
};

export default BmiTable;
