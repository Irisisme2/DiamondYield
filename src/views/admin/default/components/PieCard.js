import React from 'react';
import { Box, Flex, Text, Select, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import PieChart from 'components/charts/PieChart';
import { pieChartData, pieChartOptions } from 'variables/charts'; 

export default function TokenDistribution(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'navy.700');
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  );

  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Flex
        px={{ base: '0px', '2xl': '10px' }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Token Distribution
        </Text>
        <Select
          fontSize="sm"
          variant="subtle"
          defaultValue="monthly"
          width="unset"
          fontWeight="700"
        >
          <option value="staked">Staked</option>
          <option value="unstaked">Unstaked</option>
        </Select>
      </Flex>

      <PieChart
        h="100%"
        w="100%"
        chartData={pieChartData} // Use pieChartData imported from charts.js
        chartOptions={pieChartOptions} // Use pieChartOptions imported from charts.js
      />

      {/* Example Card to show percentages */}
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        {pieChartData.map((percentage, index) => (
          <Flex key={index} direction="column" py="5px" me={index === 0 ? '10px' : 0}>
            <Flex align="center">
              <Box
                h="8px"
                w="8px"
                bg={pieChartOptions.colors[index]}
                borderRadius="50%"
                me="4px"
              />
              <Text
                fontSize="xs"
                color="secondaryGray.600"
                fontWeight="700"
                mb="5px"
              >
                {pieChartOptions.labels[index]}
              </Text>
            </Flex>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              {percentage}%
            </Text>
          </Flex>
        ))}
      </Card>
    </Card>
  );
}
