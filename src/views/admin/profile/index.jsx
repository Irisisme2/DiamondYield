import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Image,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import Recognition from "assets/img/rewards/Recognition.png";
import Activity from "assets/img/rewards/Activity.png";
import Investment from "assets/img/rewards/Investment.png";

import Card from "components/card/Card";

const rewardsData = [
  {
    id: 1,
    name: "Bonus for Activity",
    description: "Earn rewards by participating actively.",
    amount: "100 USD",
    image: Activity,
  },
  {
    id: 2,
    name: "Investment Return",
    description: "Get returns on your investment.",
    amount: "250 USD",
    image: Investment,
  },
  {
    id: 3,
    name: "Recognition Bonus",
    description: "Recognition award",
    amount: "150 USD",
    image: Recognition,
  },
  // Dodaj więcej przykładowych nagród według potrzeb
];

const RewardsHistory = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedReward, setSelectedReward] = useState(null);

  const handleClaimReward = (rewardId) => {
    setSelectedReward(rewardId);
    onOpen();
  };

  const handleClaim = () => {
    // Logika do obsługi odebrania nagrody
    console.log(`Claiming reward with ID: ${selectedReward}`);
    onClose(); // Zamknięcie modala po odebraniu nagrody
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{ base: "1fr", xl: "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display="grid"
      >
        <Flex flexDirection="column" alignItems="left">
          <Box mt="40px"> {/* Dodatkowy margines górny */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {rewardsData.map((reward) => (
                <Card
                  key={reward.id}
                  height="600px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  p="20px"
                >
                  <Image src={reward.image} alt={reward.name} height="330px" objectFit="cover" />
                  <Flex align="center" mt="20px">
                    <Text color={textColor} fontSize="lg" fontWeight="bold">
                      {reward.name}
                    </Text>
                  </Flex>
                  <Text mt="10px" color={textColor} fontSize="md">
                    {reward.description}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Amount:</strong> {reward.amount}
                  </Text>
                  <Button mt="10px" colorScheme="blue" onClick={() => handleClaimReward(reward.id)} w="full">
                    Claim
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        {/* Pusty placeholder po prawej stronie */}
        <Box gridColumn="2 / 3"></Box>
      </Grid>

      {/* Modal do odebrania nagrody */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Claim Reward</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to claim this reward?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleClaim}>
              Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RewardsHistory;
