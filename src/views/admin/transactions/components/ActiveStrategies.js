import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  CheckboxGroup,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";

// Przykładowe dane strategii farmingowych z odpowiednimi ikonami
const initialStrategies = [
  {
    id: 1,
    name: "ETH Yield Farming",
    totalInvestment: 10000,
    returns: "12,500 ETH",
    duration: "3 months",
    options: ["Adjust Strategy", "Pause Strategy"],
    icon: Property2, // Ikona dla ETH
    performanceData: [
      { month: "Jan", value: 500 },
      { month: "Feb", value: 800 },
      { month: "Mar", value: 1200 },
      { month: "Apr", value: 1500 },
      { month: "May", value: 1800 },
      { month: "Jun", value: 2000 },
    ],
  },
  {
    id: 2,
    name: "BTC Liquidity Mining",
    totalInvestment: 100,
    returns: "150 BTC",
    duration: "6 months",
    options: ["Adjust Strategy", "Pause Strategy"],
    icon: Property1, // Ikona dla BTC
    performanceData: [
      { month: "Jan", value: 700 },
      { month: "Feb", value: 900 },
      { month: "Mar", value: 1100 },
      { month: "Apr", value: 1300 },
      { month: "May", value: 1600 },
      { month: "Jun", value: 1800 },
    ],
  },
  // Dodaj więcej strategii w tym samym formacie
  {
    id: 3,
    name: "ADA Staking Pool",
    totalInvestment: 50000,
    returns: "55,000 ADA",
    duration: "1 year",
    options: ["Adjust Strategy", "Pause Strategy"],
    icon: Property3, // Ikona dla ADA
    performanceData: [
      { month: "Jan", value: 100 },
      { month: "Feb", value: 300 },
      { month: "Mar", value: 600 },
      { month: "Apr", value: 800 },
      { month: "May", value: 1200 },
      { month: "Jun", value: 1500 },
    ],
  },
  {
    id: 4,
    name: "DOT Yield Farming",
    totalInvestment: 8000,
    returns: "9,500 DOT",
    duration: "4 months",
    options: ["Adjust Strategy", "Pause Strategy"],
    icon: Property4, // Ikona dla DOT
    performanceData: [
      { month: "Jan", value: 300 },
      { month: "Feb", value: 500 },
      { month: "Mar", value: 700 },
      { month: "Apr", value: 900 },
      { month: "May", value: 1100 },
      { month: "Jun", value: 1300 },
    ],
  },
  {
    id: 5,
    name: "BNB Staking Pool",
    totalInvestment: 25000,
    returns: "27,500 BNB",
    duration: "8 months",
    options: ["Adjust Strategy", "Pause Strategy"],
    icon: Property5, // Ikona dla BNB
    performanceData: [
      { month: "Jan", value: 200 },
      { month: "Feb", value: 400 },
      { month: "Mar", value: 600 },
      { month: "Apr", value: 900 },
      { month: "May", value: 1200 },
      { month: "Jun", value: 1500 },
    ],
  },
  {
    id: 6,
    name: "SOL Yield Farming",
    totalInvestment: 15000,
    returns: "18,000 SOL",
    duration: "5 months",
    options: ["Adjust Strategy", "Pause Strategy"],
    icon: Property6, // Ikona dla SOL
    performanceData: [
      { month: "Jan", value: 400 },
      { month: "Feb", value: 700 },
      { month: "Mar", value: 1000 },
      { month: "Apr", value: 1300 },
      { month: "May", value: 1600 },
      { month: "Jun", value: 1900 },
    ],
  },
];

const ActiveStrategies = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [strategies, setStrategies] = useState(initialStrategies);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [adjustments, setAdjustments] = useState({
    riskLevel: 5,
    duration: 3,
    autoReinvest: true,
    diversify: ["BTC", "ETH"],
  });

  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");

  const handleAdjustStrategy = (strategyId) => {
    setSelectedStrategy(strategyId);
    setAdjustModalOpen(true);
  };

  const handleAddToInvestment = (strategyId) => {
    setSelectedStrategy(strategyId);
    setInvestmentModalOpen(true);
  };

  const handleInvestmentSubmit = () => {
    const updatedStrategies = strategies.map((strategy) => {
      if (strategy.id === selectedStrategy) {
        const currentTotalInvestment = strategy.totalInvestment;
        const newTotalInvestment = currentTotalInvestment + parseInt(investmentAmount);
        return { ...strategy, totalInvestment: newTotalInvestment };
      }
      return strategy;
    });
    setStrategies(updatedStrategies);
    setInvestmentModalOpen(false);
    setInvestmentAmount("");
  };

  const handleSliderChange = (value, property) => {
    setAdjustments({ ...adjustments, [property]: value });
  };

  const handleCheckboxChange = (values) => {
    setAdjustments({ ...adjustments, diversify: values });
  };

  const handleSubmitAdjustments = () => {
    const updatedStrategies = strategies.map((strategy) => {
      if (strategy.id === selectedStrategy) {
        return {
          ...strategy,
          duration: adjustments.duration + " months",
          // Możesz dodać więcej pól do aktualizacji tutaj
        };
      }
      return strategy;
    });
    setStrategies(updatedStrategies);
    setAdjustModalOpen(false);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%" mx="auto">
      <Grid
        templateColumns={{ base: "1fr", xl: "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display="grid"
      >
        {/* Komponenty strategii */}
        <Flex flexDirection="column" alignItems="left" w="100%">
          <Box mt="40px" w="100%">
            <Text fontSize="xl" fontWeight="bold" mb="20px">
              Active Strategies
            </Text>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "repeat(3, 1fr)" }}
              gap="20px"
              w="100%"
            >
              {strategies.map((strategy) => (
                <Box key={strategy.id} w="100%">
                  <Card
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p="20px"
                    boxShadow="md"
                    w="100%"
                    mb="20px"
                  >
                    <img src={strategy.icon} alt={strategy.name} height="150px" />
                    <Text color={textColor} fontSize="lg" fontWeight="bold" mt="10px">
                      {strategy.name}
                    </Text>
                    <Text color={textColor} fontSize="md" mb="10px">
                      <strong>Total Investment:</strong> ${strategy.totalInvestment}
                    </Text>
                    <Text color={textColor} fontSize="md" mb="10px">
                      <strong>Returns:</strong> {strategy.returns}
                    </Text>
                    <Text color={textColor} fontSize="md" mb="10px">
                      <strong>Duration:</strong> {strategy.duration}
                    </Text>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleAdjustStrategy(strategy.id)}
                      mb="10px"
                    >
                      Adjust Strategy
                    </Button>
                    <Button
                      colorScheme="teal"
                      onClick={() => handleAddToInvestment(strategy.id)}
                      mb="10px"
                    >
                      Add to Investment
                    </Button>
                    <Flex justifyContent="space-between">
                      {strategy.options.map((option) => (
                        <Button key={option} variant="link" color="blue">
                          {option}
                        </Button>
                      ))}
                    </Flex>
                  </Card>
                </Box>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Grid>

      {/* Modal do dodawania do inwestycji */}
      <Modal isOpen={investmentModalOpen} onClose={() => setInvestmentModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to Investment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="8px">Enter investment amount:</Text>
            <NumberInput
              value={investmentAmount}
              onChange={(value) => setInvestmentAmount(value)}
              min={0}
              step={100}
              allowMouseWheel
              size="lg"
              mb="10px"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleInvestmentSubmit}>
              Add Investment
            </Button>
            <Button variant="ghost" onClick={() => setInvestmentModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveStrategies;
