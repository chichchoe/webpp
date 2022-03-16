import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from '@faker-js/faker/locale/de';
import Utilities from '../../utils/Utilities';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

let labels = [];

for (let index = 0; index < Utilities.daysInMonth(3, 2022); index++) {
    labels.push(`${index}-03`);
}

export const data = {
    labels,
    datasets: [
        {
            label: 'NG 1',
            data: labels.map(() => faker.datatype.number({ min: 50, max: 70 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'NG 2',
            data: labels.map(() => faker.datatype.number({ min: 50, max: 90 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'NG 3',
            data: labels.map(() => faker.datatype.number({ min: 50, max: 80 })),
            borderColor: 'rgb(255, 180, 25)',
            backgroundColor: 'rgba(255, 180, 25, 0.5)',
        },
    ],
};

export function LineBar() {
    return <Line options={options} data={data} />;
}
