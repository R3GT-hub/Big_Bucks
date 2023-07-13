import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const LineChart = ({ id, currency, days }) => {
  const [historicData, setHistoricData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setHistoricData(response.data.prices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, currency, days]);

  const labels = historicData.map((data) => {
    const timestamp = data[0];
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  });

  const prices = historicData.map((data) => data[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Price (Past ${days} Days) in ${currency}`,
        data: prices,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
       
        
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
