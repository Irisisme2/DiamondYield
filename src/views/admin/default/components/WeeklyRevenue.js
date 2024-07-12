import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Text, Select, Flex, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

// Sample data
const dailyData = [
  { date: '2022-07-01', rewards: 100 },
  { date: '2022-07-02', rewards: 120 },
  { date: '2022-07-03', rewards: 90 },
  { date: '2022-07-04', rewards: 80 },
  { date: '2022-07-05', rewards: 110 },
  { date: '2022-07-06', rewards: 130 },
  { date: '2022-07-07', rewards: 150 },
];

const weeklyData = [
  { week: 'Week 1', rewards: 750 },
  { week: 'Week 2', rewards: 800 },
  { week: 'Week 3', rewards: 850 },
  { week: 'Week 4', rewards: 900 },
];

const monthlyData = [
  { month: 'Jan', rewards: 3000 },
  { month: 'Feb', rewards: 3200 },
  { month: 'Mar', rewards: 3500 },
  { month: 'Apr', rewards: 3800 },
  { month: 'May', rewards: 4000 },
  { month: 'Jun', rewards: 4200 },
];

const RewardChart = () => {
  const [chartData, setChartData] = useState(dailyData);

  const handlePeriodChange = (value) => {
    switch (value) {
      case 'daily':
        setChartData(dailyData);
        break;
      case 'weekly':
        setChartData(weeklyData);
        break;
      case 'monthly':
        setChartData(monthlyData);
        break;
      default:
        break;
    }
  };

  const textColor = useColorModeValue('gray.800', 'gray.200');
  const gridColor = useColorModeValue('gray.200', 'gray.700');
  const barColors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Card w="100%" p="20px">
      <Flex justify="space-between" align="center" mb="20px">
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          Earned Rewards
        </Text>
        <Select defaultValue="daily" onChange={(e) => handlePeriodChange(e.target.value)} w="120px">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
      </Flex>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={chartData === monthlyData ? 'month' : chartData === weeklyData ? 'week' : 'date'} stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip />
          <Legend />
          <Bar dataKey="rewards" fill={barColors[0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RewardChart;
