import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from '@faker-js/faker/locale/de';
import Utilities from '../../utils/Utilities';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
            text: 'Chart.js Bar Chart',
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
            label: 'SLSP trong ngay',
            data: labels.map(() =>
                faker.datatype.number({ min: 300, max: 1000 })
            ),
            backgroundColor: 'rgba(83, 135, 225, 0.8)',
        },
    ],
};
export function VerticalBar() {
    return <Bar options={options} data={data} />;
}
