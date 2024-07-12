import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Select,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import { Chart, LineController, CategoryScale, LineElement, PointElement, LinearScale, Tooltip, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Rejestracja skali kategorii i innych niezbędnych elementów
Chart.register(
  LineController,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Title
);

const ActiveStakes = () => {
  const [activeStakes, setActiveStakes] = useState([
    {
      id: 1,
      poolName: 'ETH Staking Pool',
      amount: 5,
      startDate: '2024-07-01',
      endDate: '2024-08-01',
      options: 'Weekly payouts',
      image: Property2,
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'ETH Staking Pool',
            data: [5, 4, 6, 3],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      },
      details: {
        payoutHistory: [
          { week: 1, payout: 1.25 },
          { week: 2, payout: 2.0 },
          { week: 3, payout: 2.5 },
          { week: 4, payout: 4.5 },
        ],
        rewards: 2.5,
        earlyTermination: true,
        daysToPayout: 3,
      },
    },
    {
      id: 2,
      poolName: 'BTC Staking Pool',
      amount: 8,
      startDate: '2024-07-02',
      endDate: '2024-08-02',
      options: 'Monthly payouts',
      image: Property1,
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'BTC Staking Pool',
            data: [8, 7, 9, 6],
            fill: false,
            borderColor: 'rgba(255,99,132,1)',
          },
        ],
      },
      details: {
        payoutHistory: [
          { week: 1, payout: 2.0 },
          { week: 2, payout: 3.5 },
          { week: 3, payout: 4.5 },
          { week: 4, payout: 5.75 },
        ],
        rewards: 3.0,
        earlyTermination: false,
        daysToPayout: 7,
      },
    },
    {
      id: 3,
      poolName: 'ADA Staking Pool',
      amount: 10,
      startDate: '2024-07-03',
      endDate: '2024-08-03',
      options: 'Weekly payouts',
      image: Property3,
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'ADA Staking Pool',
            data: [10, 9, 11, 8],
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
          },
        ],
      },
      details: {
        payoutHistory: [
          { week: 1, payout: 1.5 },
          { week: 2, payout: 2.5 },
          { week: 3, payout: 3.0 },
          { week: 4, payout: 5.5 },
        ],
        rewards: 2.75,
        earlyTermination: true,
        daysToPayout: 5,
      },
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(1);
  const [unstakeAmount, setUnstakeAmount] = useState(1);

  const handleChange = (e) => {
    const { value } = e.target;
    let filteredStakes = [];

    if (value === "weekly") {
      filteredStakes = activeStakes.filter(stake => stake.options === "Weekly payouts");
    } else if (value === "monthly") {
      filteredStakes = activeStakes.filter(stake => stake.options === "Monthly payouts");
    } else {
      filteredStakes = activeStakes;
    }

    setActiveStakes(filteredStakes);
  };

  const getImageForToken = (poolName) => {
    switch (poolName) {
      case "ETH Staking Pool":
        return Property2;
      case "BTC Staking Pool":
        return Property1;
      case "ADA Staking Pool":
        return Property3;
      default:
        return Property2;
    }
  };

  const handleStakeMore = (id) => {
    setModalContent({
      type: "stake",
      stakeId: id,
    });
    setShowModal(true);
  };

  const handleUnstake = (id) => {
    setModalContent({
      type: "unstake",
      stakeId: id,
    });
    setShowModal(true);
  };

  const handleFormSubmit = (amount) => {
    const stakeId = modalContent.stakeId;
    if (modalContent.type === "stake") {
      console.log(`Stake more ${amount} for stake ID ${stakeId}`);
      const updatedStakes = activeStakes.map(stake =>
        stake.id === stakeId ? { ...stake, amount: stake.amount + amount } : stake
      );
      setActiveStakes(updatedStakes);
    } else {
      console.log(`Unstake ${amount} from stake ID ${stakeId}`);
      const updatedStakes = activeStakes.map(stake =>
        stake.id === stakeId ? { ...stake, amount: stake.amount - amount } : stake
      );
      setActiveStakes(updatedStakes);
    }
    setShowModal(false);
  };

  const handleShowDetails = (stake) => {
    setModalContent({
      type: "details",
      stake,
    });
    setShowModal(true);
  };

  const handleEarlyTermination = () => {
    const stakeId = modalContent.stake.id;
    const updatedStakes = activeStakes.map(stake =>
      stake.id === stakeId ? { ...stake, amount: 0, earlyTermination: true } : stake
    );
    setActiveStakes(updatedStakes);
    setShowModal(false);
  };

  const handlePayout = (stakeId) => {
    console.log(`Payout rewards for stake ID ${stakeId}`);
    const updatedStakes = activeStakes.map(stake =>
      stake.id === stakeId ? { ...stake, amount: 0 } : stake
    );
    setActiveStakes(updatedStakes);
    setShowModal(false);
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box>
      <Flex alignItems="center" mb="20px">
        <Text fontSize="xl" fontWeight="bold" mr="10px">
          Active Stakes
        </Text>
        <Select placeholder="Filter by options" onChange={handleChange} w="200px">
          <option value="all">All</option>
          <option value="weekly">Weekly payouts</option>
          <option value="monthly">Monthly payouts</option>
        </Select>
      </Flex>

      {activeStakes.map((stake) => (
        <Card key={stake.id} p="15px" mb="20px" boxShadow="lg">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Image src={getImageForToken(stake.poolName)} alt={stake.poolName} boxSize="50px" borderRadius="full" mr="15px" />
              <Box>
                <Text fontSize="xl" fontWeight="bold" color={textColor} mb="3px">
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
                  Options: {stake.options}
                </Text>
                {modalContent?.type === "details" && (
                  <Text fontSize="sm" color={textColor} mb="3px">
                    Days to Payout: {stake.details.daysToPayout}
                  </Text>
                )}
              </Box>
            </Flex>

            <Flex>
              <Button onClick={() => handleStakeMore(stake.id)} colorScheme="blue" size="sm" mr="10px">
                Stake more
              </Button>
              <Button onClick={() => handleUnstake(stake.id)} colorScheme="red" size="sm">
                Unstake
              </Button>
              <Button onClick={() => handleShowDetails(stake)} colorScheme="purple" size="sm" ml="10px">
                More details
              </Button>
              {!stake.details.earlyTermination && (
                <Button onClick={() => handlePayout(stake.id)} colorScheme="green" size="sm" ml="10px">
                  Payout
                </Button>
              )}
            </Flex>
          </Flex>

          <Box mt="15px">
            <Line
              data={stake.chartData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    type: 'category',
                    labels: stake.chartData.labels,
                    position: 'bottom'
                  },
                  y: {
                    beginAtZero: true
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'index',
                  intersect: false
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy'
                }
              }}
            />
          </Box>
        </Card>
      ))}

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalContent?.type === "stake" ? "Stake more" : modalContent?.type === "unstake" ? "Unstake" : "Stake Details"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalContent?.type === "stake" || modalContent?.type === "unstake" ? (
              <FormControl>
                <FormLabel>{modalContent?.type === "stake" ? "Stake amount:" : "Unstake amount:"}</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  min="1"
                  value={modalContent?.type === "stake" ? stakeAmount : unstakeAmount}
                  onChange={(e) => {
                    if (modalContent?.type === "stake") {
                      setStakeAmount(parseInt(e.target.value) || 0);
                    } else {
                      setUnstakeAmount(parseInt(e.target.value) || 0);
                    }
                  }}
                />
              </FormControl>
            ) : modalContent?.type === "details" && modalContent.stake ? (
              <>
                <Text fontSize="md" color={textColor} mb="5px">
                  Amount: {modalContent.stake.amount}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Start Date: {modalContent.stake.startDate}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  End Date: {modalContent.stake.endDate}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Options: {modalContent.stake.options}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Payout History:
                </Text>
                {modalContent.stake.details.payoutHistory.map((item) => (
                  <Text key={item.week} fontSize="sm" color={textColor} mb="3px">
                    Week {item.week}: ${item.payout}
                  </Text>
                ))}
                <Text fontSize="md" color={textColor} mb="5px">
                  Rewards: ${modalContent.stake.details.rewards}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Early Termination: {modalContent.stake.details.earlyTermination ? "Yes" : "No"}
                </Text>
                {modalContent.stake.details.earlyTermination ? (
                  <Text fontSize="md" color={textColor} mb="5px">
                    Early Termination Fee: ${modalContent.stake.details.rewards * 0.1}
                  </Text>
                ) : (
                  <Text fontSize="md" color={textColor} mb="5px">
                    Days to Payout: {modalContent.stake.details.daysToPayout}
                  </Text>
                )}
              </>
            ) : (
              <Text fontSize="md" color={textColor}>
                No details available.
              </Text>
            )}

            {modalContent?.type === "details" && modalContent.stake && !modalContent.stake.details.earlyTermination && (
              <Button colorScheme="orange" mt="10px" onClick={handleEarlyTermination}>
                Early Termination
              </Button>
            )}
          </ModalBody>
          <ModalFooter>
            {modalContent?.type === "stake" || modalContent?.type === "unstake" ? (
              <Button colorScheme="blue" onClick={() => handleFormSubmit(modalContent?.type === "stake" ? stakeAmount : unstakeAmount)}>
                Submit
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={() => setShowModal(false)}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveStakes;