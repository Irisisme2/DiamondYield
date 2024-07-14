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

const ActiveVsClosedStakes = () => {
  // Przykładowe dane
  const data = {
    labels: ["ETH", "BTC", "ADA"],
    datasets: [
      {
        label: "Active Stakes",
        data: [10, 8, 12], // Przykładowe dane o ilości aktywnych stawek
        backgroundColor: ["#4299E1", "#F56565", "#9F7AEA"], // Kolory dla aktywnych stawek (ETH, BTC, ADA)
        hoverOffset: 4,
      },
      {
        label: "Closed Stakes",
        data: [5, 3, 7], // Przykładowe dane o ilości zakończonych stawek
        backgroundColor: ["#90CDF4", "#ED64A6", "#C084FC"], // Kolory dla zakończonych stawek (ETH, BTC, ADA)
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Active vs Closed Stakes by Token
      </Text>
      <Box height="300px">
        <Bar data={data} options={options} />
      </Box>
      {/* Dodatkowe informacje */}
      <Box mt="4">
        {data.labels.map((label, index) => (
          <Text key={label} fontSize="sm">
            <Box as="span" mr="4" display="inline-block" w="10px" h="10px" borderRadius="50%" bg={data.datasets[0].backgroundColor[index]} />
            {label}: Active - {data.datasets[0].data[index]}, Closed - {data.datasets[1].data[index]}
          </Text>
        ))}
      </Box>
    </Card>
  );
};

export default ActiveVsClosedStakes;