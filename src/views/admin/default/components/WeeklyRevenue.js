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
  { date: '2022-07-01', Earnings: 100 },
  { date: '2022-07-02', Earnings: 120 },
  { date: '2022-07-03', Earnings: 90 },
  { date: '2022-07-04', Earnings: 80 },
  { date: '2022-07-05', Earnings: 110 },
  { date: '2022-07-06', Earnings: 130 },
  { date: '2022-07-07', Earnings: 150 },
];

const weeklyData = [
  { week: 'Week 1', Earnings: 7350 },
  { week: 'Week 2', Earnings: 8400 },
  { week: 'Week 3', Earnings: 850 },
  { week: 'Week 4', Earnings: 1900 },
];

const monthlyData = [
  { month: 'Jan', Earnings: 33000 },
  { month: 'Feb', Earnings: 3200 },
  { month: 'Mar', Earnings: 2500 },
  { month: 'Apr', Earnings: 13800 },
  { month: 'May', Earnings: 4000 },
  { month: 'Jun', Earnings: 42300 },
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
          Earnings
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
          <Bar dataKey="Earnings" fill={barColors[0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RewardChart;
