import React, { useState } from "react";
import { Box, Text, SimpleGrid, Select } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { Bar } from "react-chartjs-2";

const LiquidityMiningChart = ({ selectedPeriod }) => {
  const data = {
    labels: ["Pool 1", "Pool 2", "Pool 3", "Pool 4", "Pool 5"],
    datasets: [
      {
        label: `Liquidity Mining Earnings (${selectedPeriod})`,
        data: selectedPeriod === "daily" ? [500, 700, 600, 800, 900] :
              selectedPeriod === "monthly" ? [1500, 2200, 1800, 2500, 2000] :
              selectedPeriod === "yearly" ? [18000, 25000, 20000, 15000, 22000] : [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Earnings: $${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Liquidity Mining Earnings ({selectedPeriod})
      </Text>
      <Box height="300px">
        <Bar data={data} options={options} />
      </Box>
    </Card>
  );
};

const StakingChart = ({ selectedPeriod }) => {
  const data = {
    labels: ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5"],
    datasets: [
      {
        label: `Staking Earnings (${selectedPeriod})`,
        data: selectedPeriod === "daily" ? [400, 600, 500, 700, 800] :
              selectedPeriod === "monthly" ? [1200, 1800, 1500, 2000, 2500] :
              selectedPeriod === "yearly" ? [14000, 20000, 17000, 22000, 26000] : [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Earnings: $${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Staking Earnings ({selectedPeriod})
      </Text>
      <Box height="300px">
        <Bar data={data} options={options} />
      </Box>
    </Card>
  );
};

const YieldFarmingChart = ({ selectedPeriod }) => {
  const data = {
    labels: ["Strategy 1", "Strategy 2", "Strategy 3", "Strategy 4", "Strategy 5"],
    datasets: [
      {
        label: `Yield Farming Earnings (${selectedPeriod})`,
        data: selectedPeriod === "daily" ? [600, 800, 700, 900, 1000] :
              selectedPeriod === "monthly" ? [1800, 2500, 2000, 1500, 2200] :
              selectedPeriod === "yearly" ? [20000, 28000, 24000, 19000, 26000] : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Earnings: $${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Yield Farming Earnings ({selectedPeriod})
      </Text>
      <Box height="300px">
        <Bar data={data} options={options} />
      </Box>
    </Card>
  );
};

const EarningsSummary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <Box>
      <Select
        value={selectedPeriod}
        onChange={handlePeriodChange}
        mb="4"
        width="fit-content"
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Select>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
        <LiquidityMiningChart selectedPeriod={selectedPeriod} />
        <StakingChart selectedPeriod={selectedPeriod} />
        <YieldFarmingChart selectedPeriod={selectedPeriod} />
      </SimpleGrid>
    </Box>
  );
};

export default EarningsSummary;
