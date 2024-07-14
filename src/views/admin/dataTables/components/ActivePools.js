import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Btc from "assets/img/nfts/btc1.jpg";
import ETH from "assets/img/nfts/eth.png";
import ADA from "assets/img/nfts/ada.png";
import DOT from "assets/img/nfts/dot.png";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

// Przykładowe dane dla aktywnych pul płynności
const initialActivePoolsData = [
  {
    name: "ETH-DAI Uniswap LP",
    apr: 14.8,
    liquidity: 500000,
    userShare: 150000,
    id: 1,
    icon: ETH,
    swap: "Uniswap",
    description:
      "The ETH-DAI Uniswap LP pool provides attractive yields through participation in the liquidity market for ETH and DAI pairs. Participants enjoy consistent earnings due to robust liquidity and strategic asset management.",
    historicalData: [300, 350, 400, 420, 450, 480, 500], // Example historical data
  },
  {
    name: "BTC-USDT Sushiswap LP",
    apr: 12.2,
    liquidity: 300000,
    userShare: 80000,
    id: 2,
    icon: Btc,
    swap: "Sushiswap",
    description:
      "The BTC-USDT Sushiswap LP pool offers competitive returns by participating in the liquidity market for BTC and USDT pairs. Investors benefit from stable income streams thanks to high liquidity and effective asset management strategies.",
    historicalData: [250, 280, 300, 320, 340, 360, 380], // Example historical data
  },
  {
    name: "ADA-BNB PancakeSwap LP",
    apr: 16.5,
    liquidity: 420000,
    userShare: 100000,
    id: 3,
    icon: ADA,
    swap: "PancakeSwap",
    description:
      "The ADA-BNB PancakeSwap LP pool offers compelling returns through its participation in the liquidity market for ADA and BNB pairs. Investors benefit from reliable income streams supported by strong liquidity and effective asset management strategies.",
    historicalData: [400, 420, 440, 460, 480, 500, 520], // Example historical data
  },
  {
    name: "DOT-BNB BakerySwap LP",
    apr: 13.5,
    liquidity: 380000,
    userShare: 90000,
    id: 4,
    icon: DOT,
    swap: "BakerySwap",
    description:
      "The DOT-BNB BakerySwap LP pool delivers competitive yields through its participation in the liquidity market for DOT and BNB pairs. Investors benefit from steady income streams supported by efficient liquidity provision and proactive asset management.",
    historicalData: [280, 300, 320, 340, 360, 380, 400], // Example historical data
  },
];

const ActivePools = () => {
  const [activePoolsData, setActivePoolsData] = useState(initialActivePoolsData);
  const [selectedPool, setSelectedPool] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [liquidityToAdd, setLiquidityToAdd] = useState(0);

  const handleOpenModal = (pool) => {
    setSelectedPool(pool);
  };

  const handleCloseModal = () => {
    setSelectedPool(null);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleHideAddForm = () => {
    setShowAddForm(false);
  };

  const handleAddLiquidity = () => {
    // Dodaj logikę tutaj do dodawania płynności do wybranej puli
    if (selectedPool && liquidityToAdd > 0) {
      const newLiquidity = selectedPool.liquidity + parseInt(liquidityToAdd);
      const newUserShare = selectedPool.userShare + parseInt(liquidityToAdd);

      // Aktualizacja danych w stanie
      const updatedPoolsData = activePoolsData.map(pool =>
        pool.id === selectedPool.id ? { ...pool, liquidity: newLiquidity, userShare: newUserShare } : pool
      );
      setActivePoolsData(updatedPoolsData);

      // Aktualizacja selectedPool po stronie klienta
      setSelectedPool({
        ...selectedPool,
        liquidity: newLiquidity,
        userShare: newUserShare,
      });

      setLiquidityToAdd(0);
    }
    setShowAddForm(false);
  };

  const modalContent = (
    <Modal isOpen={selectedPool !== null} onClose={handleCloseModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedPool?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{selectedPool?.description}</Text>
          <Box mt="4">
            <Text>APR: {selectedPool?.apr}%</Text>
            <Text>Total Liquidity: {selectedPool?.liquidity}</Text>
            <Text>Your Share: {selectedPool?.userShare}</Text>
          </Box>
          <Box mt="4">
            <Text>This chart illustrates the monthly yield performance of the {selectedPool?.name} pool, showcasing the distribution of earnings between participants and overall liquidity.</Text>
            {/* Example chart - replace with actual chart component */}
            <Box height="300px">
              <Doughnut
                data={{
                  labels: ["Your Share", "Other Share"],
                  datasets: [
                    {
                      label: "Share Distribution",
                      data: [selectedPool?.userShare, selectedPool?.liquidity - selectedPool?.userShare],
                      backgroundColor: ["#FF6384", "#36A2EB"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          return tooltipItem.raw;
                        },
                      },
                    },
                  },
                }}
              />
            </Box>
          </Box>
          <Box mt="4">
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="ghost">Learn More</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box>
      {activePoolsData.map((pool) => (
        <Card key={pool.id} p="20px" mb="20px">
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="4">
            <Box display="flex" alignItems="center">
              <img src={pool.icon} alt={pool.name} style={{ width: "40px", height: "40px", marginRight: "10px" }} />
              <Text fontSize="xl" fontWeight="bold">
                {pool.name}
              </Text>
            </Box>
            <Box>
              <Box fontSize="sm" color="gray.500" textAlign="right" mb="2">
                Swap: {pool.swap}
              </Box>
              <Button colorScheme="blue" mr="2" onClick={() => handleOpenModal(pool)}>
                Performance Metrics
              </Button>
              <Button colorScheme="teal" onClick={() => handleOpenModal(pool)}>
                Historical Data
              </Button>
              <Button colorScheme="green" ml="2" onClick={handleShowAddForm}>
                Add Liquidity
              </Button>
            </Box>
          </Box>
          <Box mb="4">
            <Text>
              APR: {pool.apr}% | Total Liquidity: {pool.liquidity} | Your Share: {pool.userShare}
            </Text>
          </Box>
          <Box>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Performance",
                    data: pool.historicalData,
                    fill: false,
                    backgroundColor: pool.icon === ETH || pool.icon === DOT ? "rgba(75,192,192,0.4)" : "rgba(255,99,132,0.4)", // Adjust colors based on token
                    borderColor: pool.icon === ETH || pool.icon === DOT ? "rgba(75,192,192,1)" : "rgba(255,99,132,1)", // Adjust colors based on token
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        </Card>
      ))}
      {modalContent}
      {/* Formularz dodawania płynności */}
      <Modal isOpen={showAddForm} onClose={handleHideAddForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Liquidity to {selectedPool?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter amount to add:</FormLabel>
              <Input
                type="number"
                value={liquidityToAdd}
                onChange={(e) => setLiquidityToAdd(e.target.value)}
                placeholder="Enter amount"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleAddLiquidity}>
              Add
            </Button>
            <Button variant="ghost" onClick={handleHideAddForm}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActivePools;
