import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";

const PastStakes = () => {
  const [pastStakes, setPastStakes] = useState([
    {
      id: 1,
      poolName: "ETH Staking Pool",
      amount: 5,
      startDate: "2024-07-01",
      endDate: "2024-08-01",
      apy: 8.5,
      earnings: 10.25,
      image: Property2,
      details: {
        payoutHistory: [
          { week: 1, payout: 1.25 },
          { week: 2, payout: 2.0 },
          { week: 3, payout: 2.5 },
          { week: 4, payout: 4.5 },
        ],
        rewards: 2.5,
        earlyTermination: true,
      },
    },
    {
      id: 2,
      poolName: "BTC Staking Pool",
      amount: 10,
      startDate: "2024-06-15",
      endDate: "2024-07-15",
      apy: 6.75,
      earnings: 15.75,
      image: Property1,
      details: {
        payoutHistory: [
          { week: 1, payout: 2.0 },
          { week: 2, payout: 3.5 },
          { week: 3, payout: 4.5 },
          { week: 4, payout: 5.75 },
        ],
        rewards: 3.0,
        earlyTermination: false,
      },
    },
    {
      id: 3,
      poolName: "ADA Staking Pool",
      amount: 8,
      startDate: "2024-07-10",
      endDate: "2024-08-10",
      apy: 7.25,
      earnings: 12.5,
      image: Property3,
      details: {
        payoutHistory: [
          { week: 1, payout: 1.5 },
          { week: 2, payout: 2.5 },
          { week: 3, payout: 3.0 },
          { week: 4, payout: 5.5 },
        ],
        rewards: 2.75,
        earlyTermination: true,
      },
    },
    {
      id: 4,
      poolName: "DOT Staking Pool",
      amount: 15,
      startDate: "2024-07-05",
      endDate: "2024-08-05",
      apy: 9.0,
      earnings: 18.0,
      image: Property4,
      details: {
        payoutHistory: [
          { week: 1, payout: 2.5 },
          { week: 2, payout: 3.0 },
          { week: 3, payout: 4.0 },
          { week: 4, payout: 8.5 },
        ],
        rewards: 3.5,
        earlyTermination: false,
      },
    },
    {
      id: 5,
      poolName: "BNB Staking Pool",
      amount: 12,
      startDate: "2024-07-03",
      endDate: "2024-08-03",
      apy: 7.0,
      earnings: 14.0,
      image: Property5,
      details: {
        payoutHistory: [
          { week: 1, payout: 2.0 },
          { week: 2, payout: 3.0 },
          { week: 3, payout: 3.5 },
          { week: 4, payout: 5.5 },
        ],
        rewards: 2.0,
        earlyTermination: true,
      },
    },
    {
      id: 6,
      poolName: "SQL Staking Pool",
      amount: 7,
      startDate: "2024-06-28",
      endDate: "2024-07-28",
      apy: 8.0,
      earnings: 11.5,
      image: Property6,
      details: {
        payoutHistory: [
          { week: 1, payout: 1.75 },
          { week: 2, payout: 2.25 },
          { week: 3, payout: 3.0 },
          { week: 4, payout: 4.5 },
        ],
        rewards: 2.25,
        earlyTermination: false,
      },
    },
    // Add more stakes with appropriate data
  ]);

  const [selectedStake, setSelectedStake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle stake click to open modal
  const handleStakeClick = (stake) => {
    setSelectedStake(stake);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedStake(null);
    setIsModalOpen(false);
  };

  // Filtered stakes state
  const [filteredStakes, setFilteredStakes] = useState(pastStakes);

  // Handle change in filter
  const handleChange = (e) => {
    const { value } = e.target;
    let filteredStakes = [];

    if (value === "all") {
      filteredStakes = pastStakes;
    } else {
      filteredStakes = pastStakes.filter(stake =>
        stake.endDate.includes(value)
      );
    }

    setFilteredStakes(filteredStakes);
  };

  // Get image for token
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
      case "SQL Staking Pool":
        return Property6;
      default:
        return Property2; // Default to ETH image if poolName not recognized
    }
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box>
      {/* Filter and title */}
      <Flex alignItems="center" mb="20px">
        <Text fontSize="xl" fontWeight="bold" mr="10px">
          Past Stakes
        </Text>
        <Select
          placeholder="Filter by end date"
          onChange={handleChange}
          w="200px"
        >
          <option value="all">All</option>
          <option value="2024-08">August 2024</option>
          {/* Add more filter options as needed */}
        </Select>
      </Flex>

      {/* Display filtered stakes */}
      {filteredStakes.map((stake) => (
        <Box key={stake.id} mb="20px">
          <Card
            p="15px"
            onClick={() => handleStakeClick(stake)}
            cursor="pointer"
            _hover={{ boxShadow: "lg" }}
          >
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <Image
                  src={getImageForToken(stake.poolName)}
                  alt={stake.poolName}
                  w="60px"
                  h="60px"
                  borderRadius="full"
                  mr="15px"
                />
                <Box>
                  <Text fontSize="md" fontWeight="bold" color={textColor} mb="3px">
                    {stake.poolName}
                  </Text>
                  <Text fontSize="sm" color={textColor} mb="3px">
                    Amount: {stake.amount}
                  </Text>
                  <Text fontSize="sm" color={textColor} mb="3px">
                    Start Date: {stake.startDate}
                  </Text>
                  <Text fontSize="sm" color={textColor} mb="3px">
                    End Date: {stake.endDate}
                  </Text>
                  <Text fontSize="sm" color={textColor} mb="3px">
                    APY: {stake.apy}%
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    Earnings: ${stake.earnings}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Card>
        </Box>
      ))}

      {/* Modal for detailed stake information */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stake Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedStake && (
              <Box>
                <Text fontSize="lg" fontWeight="bold" color={textColor} mb="10px">
                  {selectedStake.poolName}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Amount: {selectedStake.amount}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Start Date: {selectedStake.startDate}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  End Date: {selectedStake.endDate}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  APY: {selectedStake.apy}%
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Earnings: ${selectedStake.earnings}
                </Text>
                <Text fontSize="md" color={textColor} mb="10px">
                  Payout History:
                </Text>
                {selectedStake.details.payoutHistory.map((item) => (
                  <Text key={item.week} fontSize="sm" color={textColor} mb="3px">
                    Week {item.week}: ${item.payout}
                  </Text>
                ))}
                <Text fontSize="md" color={textColor} mb="5px">
                  Rewards: ${selectedStake.details.rewards}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Early Termination: {selectedStake.details.earlyTermination ? "Yes" : "No"}
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PastStakes;