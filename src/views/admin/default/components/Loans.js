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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faGem, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';

const ActiveBlockchainLoans = () => {
  const [activeLoans, setActiveLoans] = useState([
    {
      id: 1,
      loanName: 'DeFi Yield Loan',
      loanAmount: 5000,
      interestRate: 0.05,
      duration: '6 months',
      icon: faCoins,
      chartData: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
        datasets: [
          {
            label: 'Loan Amount',
            data: [5000, 4800, 4600, 4400],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      },
    },
    {
      id: 2,
      loanName: 'NFT-backed Loan',
      loanAmount: 10000,
      interestRate: 0.08,
      duration: '1 year',
      icon: faGem,
      chartData: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
        datasets: [
          {
            label: 'Loan Amount',
            data: [10000, 9800, 9600, 9400],
            fill: false,
            borderColor: 'rgba(255,99,132,1)',
          },
        ],
      },
    },
    {
      id: 3,
      loanName: 'Staking Rewards Loan',
      loanAmount: 15000,
      interestRate: 0.07,
      duration: '2 years',
      icon: faHandHoldingUsd,
      chartData: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
        datasets: [
          {
            label: 'Loan Amount',
            data: [15000, 14500, 14000, 13500],
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
          },
        ],
      },
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0.05);
  const [duration, setDuration] = useState("6 months");

  const handleInitiateLoan = () => {
    setModalContent("initiateLoan");
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    let filteredLoans = [];

    if (value === "highest") {
      filteredLoans = [...activeLoans].sort((a, b) => b.loanAmount - a.loanAmount);
    } else if (value === "lowest") {
      filteredLoans = [...activeLoans].sort((a, b) => a.loanAmount - b.loanAmount);
    } else {
      filteredLoans = activeLoans;
    }

    setActiveLoans(filteredLoans);
  };

  const handleShowDetails = (loan) => {
    setModalContent({
      type: "details",
      loan,
    });
    setShowModal(true);
  };

  const handleLoanSubmit = () => {
    const newLoan = {
      id: activeLoans.length + 1,
      loanName: loanType,
      loanAmount,
      interestRate,
      duration,
      icon: faCoins, // Placeholder icon for now
      chartData: {
        labels: [],
        datasets: [],
      },
    };
    setActiveLoans([...activeLoans, newLoan]);
    setShowModal(false);
    // Reset form fields
    setLoanType("");
    setLoanAmount(0);
    setInterestRate(0.05);
    setDuration("6 months");
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box>
      <Flex alignItems="center" mb="20px">
        <Text fontSize="xl" fontWeight="bold" mr="10px">
          Active Blockchain Loans
        </Text>
        <Select placeholder="Sort by" onChange={handleChange} w="200px">
          <option value="default">Default</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </Select>
        <Button ml="10px" colorScheme="blue" onClick={handleInitiateLoan}>
          Initiate Loan
        </Button>
      </Flex>

      {activeLoans.map((loan) => (
        <Card key={loan.id} p="15px" mb="20px" boxShadow="lg">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <FontAwesomeIcon icon={loan.icon} size="2x" style={{ marginRight: '15px' }} />
              <Box>
                <Text fontSize="xl" fontWeight="bold" color={textColor} mb="3px">
                  {loan.loanName}
                </Text>
                <Text fontSize="sm" color={textColor} mb="3px">
                  Loan Amount: ${loan.loanAmount}
                </Text>
                <Text fontSize="sm" color={textColor} mb="3px">
                  Interest Rate: {loan.interestRate * 100}%
                </Text>
                <Text fontSize="sm" color={textColor} mb="3px">
                  Duration: {loan.duration}
                </Text>
              </Box>
            </Flex>

            <Button onClick={() => handleShowDetails(loan)} colorScheme="purple" size="sm">
              More details
            </Button>
          </Flex>

          <Box mt="15px">
            <Line
              data={loan.chartData}
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
                    labels: loan.chartData.labels,
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
            {modalContent === "initiateLoan" ? "Initiate Blockchain Loan" : "Loan Details"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalContent === "initiateLoan" ? (
              <FormControl>
                <FormLabel>Select Loan Type:</FormLabel>
                <Select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  placeholder="Select loan type"
                >
                  <option value="DeFi Yield Loan">DeFi Yield Loan</option>
                  <option value="NFT-backed Loan">NFT-backed Loan</option>
                  <option value="Staking Rewards Loan">Staking Rewards Loan</option>
                </Select>
                <FormLabel mt={3}>Loan Amount:</FormLabel>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value) || 0)}
                  placeholder="Enter loan amount"
                />
                <FormLabel mt={3}>Interest Rate:</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  placeholder="Enter interest rate"
                />
                <FormLabel mt={3}>Duration:</FormLabel>
                <Select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Select duration"
                >
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                </Select>
              </FormControl>
            ) : modalContent?.type === "details" && modalContent.loan ? (
              <>
                <Text fontSize="md" color={textColor} mb="5px">
                  Loan Amount: ${modalContent.loan.loanAmount}
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Interest Rate: {modalContent.loan.interestRate * 100}%
                </Text>
                <Text fontSize="md" color={textColor} mb="5px">
                  Duration: {modalContent.loan.duration}
                </Text>
              </>
            ) : (
              <Text fontSize="md" color={textColor}>
                No details available.
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            {modalContent === "initiateLoan" ? (
              <Button colorScheme="blue" onClick={handleLoanSubmit}>
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

export default ActiveBlockchainLoans;
