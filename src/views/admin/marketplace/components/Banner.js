import React from "react";

// Chakra imports
import { Flex, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/Banner1.png";

export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      direction="column"
      align="center" // Wyśrodkowanie w pionie
      justify="center" // Wyśrodkowanie w poziomie
      bgImage={`url(${banner})`}
      bgSize="cover"
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }} // Poprawka wartości px
      borderRadius="30px"
      textAlign="center" // Wyśrodkowanie tekstu
    >
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color="black"
        fontWeight="bold" // Wytluszczenie tekstu
        mb="14px"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        lineHeight={{ base: "35px", md: "42px" }}
      >
        Stake, earn and have fun
      </Text>
    </Flex>
  );
}
