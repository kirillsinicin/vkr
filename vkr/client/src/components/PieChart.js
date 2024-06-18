import React from 'react';
import { Pie } from 'react-chartjs-2';

const statusDictionary = {
    PUBLISHED: "Опубликован",
    IN_PROGRESS: "В работе",
    READY: "Готов",
}

function transformData(serverData) {
    const clientData = {labels: [], datasets: []};
    clientData.labels = serverData.map(item => translateWord(item.label, statusDictionary))
    clientData.datasets = [
        {
            data: serverData.map(item => item.data),
            backgroundColor: serverData.map(item => getRandomColor())
        }
    ]
    return clientData
}

function translateWord(word, dict) {

    if (dict[word]) {
        return dict[word]
    } else {
        return word
    }
}

function getRandomColor(){
    return `rgba(${getRandom()}, ${getRandom()}, ${getRandom()}, 0.2)`
}

function getRandom(){
    return parseInt(Math.random() * 255)
}


const PieChart = ({ chartData }) => {
    return (
        <Pie data={transformData(chartData)} />
    );
};

export default PieChart;