import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import { Chart, BarElement, CategoryScale, BarController, LinearScale, Tooltip, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { registerables } from 'chart.js';

// Rejestracja wszystkich niezbędnych elementów wykresu
Chart.register(
  BarElement,
  CategoryScale,
  BarController,
  LinearScale,
  Tooltip,
  Title,
  ...registerables
);

const AverageAPYChart = () => {
  // Przykładowe dane
  const data = {
    labels: ["ETH Staking", "BTC Staking", "ADA Staking"],
    datasets: [
      {
        label: "Average APY",
        data: [7.5, 6.2, 8.0], // Przykładowe dane o średnim APY
        backgroundColor: ["#F56565", "#4299E1", "#805AD5"], // Kolory w tonacji czerwonej, niebieskiej i fioletowej
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Average APY: ${tooltipItem.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `${value}%`;
          }
        }
      }
    }
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Average APY by Staking Pool
      </Text>
      <Box height="300px">
        <Bar data={data} options={options} />
      </Box>
      {/* Dodatkowe informacje */}
      <Box mt="4">
        {data.labels.map((label, index) => (
          <Text key={label} fontSize="sm">
            <Box as="span" mr="4" display="inline-block" w="10px" h="10px" borderRadius="50%" bg={data.datasets[0].backgroundColor[index]} />
            {label}: {data.datasets[0].data[index]}%
          </Text>
        ))}
      </Box>
    </Card>
  );
};

export default AverageAPYChart;
