import React, { useState } from "react";
import { Box, Text, Select } from "@chakra-ui/react";
import Card from "components/card/Card";
import { Pie } from 'react-chartjs-2';

const Portfolio = () => {
  // Przykładowe dane dla różnych okresów czasu
  const [selectedPeriod, setSelectedPeriod] = useState('monthly'); // Domyślnie miesięczne dane

  const monthlyData = {
    labels: ["Yield Farming", "Liquidity Pools", "DeFi Assets"],
    datasets: [
      {
        label: "Total ",
        data: [23, 16, 55],
        backgroundColor: ["#6CB2EB", "#4A5568", "#805AD5"], // Kolory w odcieniach bardziej kojarzących się z DeFi
        hoverOffset: 4,
      },
    ],
  };

  const yearlyData = {
    labels: ["Yield Farming", "Liquidity Pools", "DeFi Assets"],
    datasets: [
      {
        label: "Total ",
        data: [315, 60, 240],
        backgroundColor: ["#6CB2EB", "#4A5568", "#805AD5"], // Kolory w odcieniach bardziej kojarzących się z DeFi
        hoverOffset: 4,
      },
    ],
  };

  const dailyData = {
    labels: ["Yield Farming", "Liquidity Pools", "DeFi Assets"],
    datasets: [
      {
        label: "Total ",
        data: [10, 5, 8],
        backgroundColor: ["#6CB2EB", "#4A5568", "#805AD5"], // Kolory w odcieniach bardziej kojarzących się z DeFi
        hoverOffset: 4,
      },
    ],
  };

  // Opcje dla wykresu kołowego
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

  // Handler zmiany okresu czasu
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  // Wybór danych na podstawie wybranego okresu
  let data;
  switch (selectedPeriod) {
    case 'monthly':
      data = monthlyData;
      break;
    case 'yearly':
      data = yearlyData;
      break;
    case 'daily':
      data = dailyData;
      break;
    default:
      data = monthlyData;
  }

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Wallet Distribution
      </Text>
      <Select
        fontSize="sm"
        variant="subtle"
        defaultValue="monthly"
        width="unset"
        fontWeight="700"
        mb="4"
        onChange={handlePeriodChange}
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Select>
      <Box height="300px" display="flex" justifyContent="center">
        <Box width="300px">
          <Pie data={data} options={options} />
        </Box>
      </Box>
      {/* Dodatkowe informacje */}
      <Box mt="4">
        {data.labels.map((label, index) => (
          <Text key={label} fontSize="sm">
            <Box
              as="span"
              mr="4"
              display="inline-block"
              w="10px"
              h="10px"
              borderRadius="50%"
              bg={data.datasets[0].backgroundColor[index]}
            />
            {label}: {data.datasets[0].data[index]}
          </Text>
        ))}
      </Box>
    </Card>
  );
};

export default Portfolio;
