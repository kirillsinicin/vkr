import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
    labels: ['Готов', 'В работе', 'Опубликован'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

const PieChart = () => {
    return (
        <Pie data={data} />
    );
};

export default PieChart;