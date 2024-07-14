import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Button,
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
import { Line } from "react-chartjs-2";

const TopPerformingAssets = () => {
  const [topAssets, setTopAssets] = useState([
    {
      id: 1,
      asset: 'Bitcoin',
      returns: '15%',
      details: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.',
      image: Property1,
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Bitcoin',
            data: [15, 14, 16, 13],
            fill: false,
            borderColor: 'rgba(255,99,132,1)',
          },
        ],
      },
      popupText: 'Bitcoin (BTC) is the first decentralized cryptocurrency. It was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto and started in 2009 when its implementation was released as open-source software.',
      riskRating: 'Medium'
    },
    {
      id: 2,
      asset: 'Ethereum',
      returns: '12%',
      details: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform.',
      image: Property2,
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Ethereum',
            data: [12, 11, 13, 10],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      },
      popupText: 'Ethereum (ETH) is a decentralized platform that enables developers to build smart contracts and decentralized applications (dApps). It was proposed by Vitalik Buterin in late 2013 and development began in early 2014.',
      riskRating: 'High'
    },
    {
      id: 3,
      asset: 'Cardano',
      returns: '10%',
      details: 'Cardano is a proof-of-stake blockchain platform that says its goal is to allow “changemakers, innovators and visionaries” to bring about positive global change.',
      image: Property3,
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Cardano',
            data: [10, 9, 11, 8],
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
          },
        ],
      },
      popupText: 'Cardano (ADA) is a blockchain platform for the development of decentralized applications and smart contracts. It aims to provide a more secure and scalable infrastructure for the future of finance.',
      riskRating: 'Low'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShowDetails = (asset) => {
    setModalContent(asset);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const getRiskColor = (riskRating) => {
    switch (riskRating) {
      case 'Low':
        return 'green.500';
      case 'Medium':
        return 'orange.500';
      case 'High':
        return 'red.500';
      default:
        return 'gray.500';
    }
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box>
      <Flex alignItems="center" mb="20px">
        <Text fontSize="xl" fontWeight="bold" mr="10px">
          Top Performing Assets
        </Text>
      </Flex>

      {topAssets.map((asset) => (
        <Card key={asset.id} p="15px" mb="20px" boxShadow="lg">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Image src={asset.image} alt={asset.asset} boxSize="50px" borderRadius="full" mr="15px" />
              <Box>
                <Text fontSize="xl" fontWeight="bold" color={textColor} mb="3px">
                  {asset.asset}
                </Text>
                <Text fontSize="sm" color={textColor} mb="3px">
                  Returns: {asset.returns}
                </Text>
                <Text fontSize="sm" color={textColor} mb="3px">
                  Details: {asset.details}
                </Text>
                <Text fontSize="sm" color={getRiskColor(asset.riskRating)} mb="3px">
                  Risk Rating: {asset.riskRating}
                </Text>
              </Box>
            </Flex>

            <Flex>
              <Button onClick={() => handleShowDetails(asset)} colorScheme="purple" size="sm" ml="10px">
                More details
              </Button>
            </Flex>
          </Flex>

          <Box mt="15px">
            <Line
              data={asset.chartData}
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
                    labels: asset.chartData.labels,
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

      <Modal isOpen={showModal} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalContent?.asset}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" mb="4px">
              Returns: {modalContent?.returns}
            </Text>
            <Text fontSize="md" mb="4px">
              Details: {modalContent?.details}
            </Text>
            <Text fontSize="md" mb="4px">
              Risk Rating: {modalContent?.riskRating}
            </Text>
            <Text fontSize="md">
              {modalContent?.popupText}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TopPerformingAssets;
