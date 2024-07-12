import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import { Chart, ArcElement, LineController, CategoryScale, LineElement, PointElement, LinearScale, Tooltip, Title } from 'chart.js';
import { registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Rejestruj wszystkie niezbędne elementy wykresu
Chart.register(
  ArcElement,
  LineController,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Title,
  ...registerables
);

const TotalEarningsSummary = () => {
  // Przykładowe dane
  const data = {
    labels: ["ETH Staking", "BTC Staking", "ADA Staking"],
    datasets: [
      {
        label: "Total Earnings",
        data: [3000, 4500, 2500], // Przykładowe dane o zyskach
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
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Total Earnings Summary
      </Text>
      <Box height="300px">
        <Pie data={data} options={options} />
      </Box>
      {/* Dodatkowe informacje */}
      <Box mt="4">
        {data.labels.map((label, index) => (
          <Text key={label} fontSize="sm">
            <Box as="span" mr="4" display="inline-block" w="10px" h="10px" borderRadius="50%" bg={data.datasets[0].backgroundColor[index]} />
            {label}: ${data.datasets[0].data[index]}
          </Text>
        ))}
      </Box>
    </Card>
  );
};

export default TotalEarningsSummary;
