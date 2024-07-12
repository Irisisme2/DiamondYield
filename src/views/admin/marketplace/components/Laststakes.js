import React from "react";
import { Box, Flex, Icon, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";

const LastStakes = ({ lastStakes }) => {
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");

  const getImageForToken = (poolName) => {
    switch (poolName) {
      case "ETH Staking Pool":
        return Property2;
      case "BTC Staking Pool":
        return Property1;
      case "ADA Staking Pool":
        return Property3;
      case "DOT Staking Pool":
        return Property4;
      case "BNB Staking Pool":
        return Property5;
      case "SOL Staking Pool":
        return Property6;
      default:
        return Property2; // Default to ETH image if poolName not recognized
    }
  };

  return (
    <Box mt="40px" bg={useColorModeValue("white", "navy.700")} p="20px" borderRadius="10px">
      <Text fontSize="xl" fontWeight="bold" mb="20px" color={textColor}>
        Last Stakes
      </Text>
      {lastStakes.map((stake, index) => (
        <Card
          key={index}
          _hover={bgItem}
          bg="transparent"
          boxShadow="unset"
          px="24px"
          py="21px"
          transition="0.2s linear"
          mb="20px"
        >
          <Flex direction={{ base: "column" }} justify="center">
            <Flex position="relative" align="center">
              <Image src={getImageForToken(stake.poolName)} w="66px" h="66px" borderRadius="20px" me="16px" />
              <Flex
                direction="column"
                w={{ base: "70%", md: "100%" }}
                me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
              >
                <Text color={textColor} fontSize={{ base: "md" }} mb="5px" fontWeight="bold" me="14px">
                  {stake.poolName}
                </Text>
                <Text color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400" me="14px">
                  Amount: {stake.amount}
                </Text>
                <Text color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400" me="14px">
                  Staking Period: {stake.stakingPeriod}
                </Text>
              </Flex>
              <Flex me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }} align="center">
                <Image src={getImageForToken(stake.poolName)} w="24px" h="24px" borderRadius="50%" me="7px" />
                <Text fontWeight="700" fontSize="md" color={textColor}>
                  {stake.amount}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Box>
  );
};

export default LastStakes;
