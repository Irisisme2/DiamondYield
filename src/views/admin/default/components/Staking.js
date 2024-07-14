import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  HStack,
  Textarea,
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

// Sample data for strategies
const strategyData = [
  {
    id: 1,
    name: "Strategy 1",
    performance: "12% APY",
    color: "#8884d8",
    data: [
      { name: "Week 1", value: 10 },
      { name: "Week 2", value: 12 },
      { name: "Week 3", value: 11 },
      { name: "Week 4", value: 14 },
      { name: "Week 5", value: 13 },
    ],
  },
  {
    id: 2,
    name: "Strategy 2",
    performance: "15% APY",
    color: "#82ca9d",
    data: [
      { name: "Week 1", value: 14 },
      { name: "Week 2", value: 15 },
      { name: "Week 3", value: 13 },
      { name: "Week 4", value: 16 },
      { name: "Week 5", value: 17 },
    ],
  },
  {
    id: 3,
    name: "Strategy 3",
    performance: "10% APY",
    color: "#ffc658",
    data: [
      { name: "Week 1", value: 9 },
      { name: "Week 2", value: 10 },
      { name: "Week 3", value: 11 },
      { name: "Week 4", value: 8 },
      { name: "Week 5", value: 12 },
    ],
  },
];

const ActiveStrategies = () => {
  const [strategies, setStrategies] = useState(strategyData);
  const [showModal, setShowModal] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [optimizationValue, setOptimizationValue] = useState(50); // Default value for optimization

  const handleOptimizeStrategy = (strategyId) => {
    const strategy = strategies.find((s) => s.id === strategyId);
    if (strategy) {
      setSelectedStrategy(strategy);
      setShowModal(true);
    }
  };

  const handleOptimizationSubmit = () => {
    console.log(
      `Optimizing strategy ${selectedStrategy.name} with value ${optimizationValue}`
    );
    // Implement logic to optimize strategy with optimizationValue
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStrategy(null);
    setOptimizationValue(50); // Reset optimization value on modal close
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const gridColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      <Flex alignItems="center" mb="20px">
        <Text fontSize="xl" fontWeight="bold" mr="10px">
          Active Farming Strategies
        </Text>
      </Flex>

      {strategies.map((strategy) => (
        <Card key={strategy.id} p="20px" boxShadow="lg" mb="20px">
          <Flex justify="space-between" align="center" mb="10px">
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              {strategy.name}
            </Text>
            <Button
              colorScheme="purple"
              size="sm"
              onClick={() => handleOptimizeStrategy(strategy.id)}
            >
              Optimize
            </Button>
          </Flex>
          <Text fontSize="sm" color={textColor} mb="10px">
            Performance: {strategy.performance}
          </Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={strategy.data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke={strategy.color}
                strokeWidth={2}
                dot={{ stroke: strategy.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
                name="Performance"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ))}

      {/* Optimization Modal */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Optimize Strategy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="10px">
              Strategy: {selectedStrategy?.name} ({selectedStrategy?.performance})
            </Text>
            <FormControl mb="20px">
              <FormLabel>Optimization Slider</FormLabel>
              <Slider
                aria-label="Optimization Slider"
                value={optimizationValue}
                onChange={(value) => setOptimizationValue(value)}
              >
                <SliderTrack>
                  <SliderFilledTrack bg="blue.500" />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box
                    color="blue.500"
                    borderWidth="2px"
                    borderColor="blue.500"
                    borderRadius="full"
                    cursor="pointer"
                  />
                </SliderThumb>
              </Slider>
              <Text mt={2} textAlign="center">
                Optimization Value: {optimizationValue}
              </Text>
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Additional Recommendations</FormLabel>
              <Textarea placeholder="Enter additional recommendations..." />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOptimizationSubmit}>
              Optimize
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box p={3} bg="white" boxShadow="md" borderRadius="md">
        <Text fontSize="sm" fontWeight="bold">
          {`${payload[0].payload.name}`}
        </Text>
        <Text fontSize="sm">{`Value: ${payload[0].value}`}</Text>
      </Box>
    );
  }
  return null;
};

export default ActiveStrategies;
