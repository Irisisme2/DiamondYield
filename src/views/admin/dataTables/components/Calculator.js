import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

const LiquidityCalculator = () => {
  const [liquidity, setLiquidity] = useState(0);
  const [apr, setApr] = useState(0);
  const [timeInMonths, setTimeInMonths] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const handleCalculateEarnings = () => {
    // Formula for calculating earnings: Earnings = Liquidity * APR * (Time in months / 12)
    const earningsValue = (liquidity * apr * (timeInMonths / 12)) / 100;
    setEarnings(earningsValue);
  };

  return (
    <Card p="20px" mb="20px">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Liquidity Pool Earnings Calculator
        </Text>
        <FormControl mb="4">
          <FormLabel>Liquidity Amount</FormLabel>
          <Input
            type="number"
            value={liquidity}
            onChange={(e) => setLiquidity(e.target.value)}
            placeholder="Enter liquidity amount"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>APR (%)</FormLabel>
          <Input
            type="number"
            value={apr}
            onChange={(e) => setApr(e.target.value)}
            placeholder="Enter APR"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Time in Months</FormLabel>
          <Input
            type="number"
            value={timeInMonths}
            onChange={(e) => setTimeInMonths(e.target.value)}
            placeholder="Enter time in months"
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleCalculateEarnings} mb="4">
          Calculate Earnings
        </Button>
        {earnings > 0 && (
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb="2">
              Estimated Earnings:
            </Text>
            <Text fontSize="xl">${earnings.toFixed(2)}</Text>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default LiquidityCalculator;
