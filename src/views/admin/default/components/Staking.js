import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

// Sample data
const data = [
  { name: 'Jan', staking: 400, rewards: 100, transactions: 300 },
  { name: 'Feb', staking: 300, rewards: 150, transactions: 280 },
  { name: 'Mar', staking: 500, rewards: 120, transactions: 320 },
  { name: 'Apr', staking: 700, rewards: 180, transactions: 340 },
  { name: 'May', staking: 600, rewards: 200, transactions: 310 },
  { name: 'Jun', staking: 800, rewards: 250, transactions: 330 },
  { name: 'Jul', staking: 700, rewards: 230, transactions: 315 },
  { name: 'Aug', staking: 900, rewards: 280, transactions: 350 },
  { name: 'Sep', staking: 1000, rewards: 300, transactions: 360 },
  { name: 'Oct', staking: 1100, rewards: 320, transactions: 370 },
  { name: 'Nov', staking: 1200, rewards: 340, transactions: 380 },
  { name: 'Dec', staking: 1300, rewards: 360, transactions: 390 },
];

const TotalSpent = () => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const gridColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card w="100%" p="20px">
      <Text fontSize="lg" fontWeight="bold" mb="20px" color={textColor}>
        Staking Performance
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="staking" stroke="#8884d8" activeDot={{ r: 8 }} name="Staking" />
          <Line type="monotone" dataKey="rewards" stroke="#82ca9d" name="Rewards" />
          <Line type="monotone" dataKey="transactions" stroke="#ff7300" name="Transactions" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box p={3} bg="white" boxShadow="md" borderRadius="md">
        <Text fontSize="sm" fontWeight="bold">{`${payload[0].payload.name}`}</Text>
        <Text fontSize="sm">{`Staking: ${payload[0].payload.staking}`}</Text>
        <Text fontSize="sm">{`Rewards: ${payload[0].payload.rewards}`}</Text>
        <Text fontSize="sm">{`Transactions: ${payload[0].payload.transactions}`}</Text>
      </Box>
    );
  }

  return null;
};

export default TotalSpent;
