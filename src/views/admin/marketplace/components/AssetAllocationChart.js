import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { Doughnut } from "react-chartjs-2";

const AssetAllocationChart = () => {
  const data = {
    labels: ["Liquidity Mining", "Staking", "Yield Farming", "Others"],
    datasets: [
      {
        label: "Asset Allocation",
        data: [30, 25, 35, 10], // Example data (percentages)
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right', // Positioning legend to the right
        align: 'center', // Centering the legend vertically
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
        Asset Allocation
      </Text>
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Doughnut data={data} options={options} />
      </Box>
    </Card>
  );
};

export default AssetAllocationChart;
