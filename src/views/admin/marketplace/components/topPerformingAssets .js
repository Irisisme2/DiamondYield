import React from "react";
import { Box, Text, SimpleGrid, Stack, Link, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { Line } from "react-chartjs-2";
import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";
import Property7 from "assets/img/nfts/ubit.png";

const topPerformingAssets = [
  { id: 1, asset: "BTC", color: "#FFA500", return: [10, 12, 15, 14, 13], icon: Property1, details: "Bitcoin (BTC) has seen significant growth over the past year, driven by institutional adoption and increasing demand." },
  { id: 2, asset: "ETH", color: "#ADD8E6", return: [9, 11, 13, 12, 15], icon: Property2, details: "Ethereum (ETH) continues to benefit from its dominance in the DeFi and NFT markets, alongside the transition to Ethereum 2.0." },
  { id: 3, asset: "ADA", color: "#0033AD", return: [7, 8, 9, 10, 10], icon: Property3, details: "Cardano (ADA) has been on the rise due to its strong community support and ongoing development of its smart contract capabilities." },
  { id: 4, asset: "DOT", color: "#E6007A", return: [8, 9, 8, 9, 9], icon: Property4, details: "Polkadot (DOT) has seen substantial returns as it aims to provide interoperability between various blockchains." },
  { id: 5, asset: "BNB", color: "#000000", return: [9, 10, 11, 10, 11], icon: Property5, details: "Binance Coin (BNB) has grown due to its utility on the Binance exchange and its role in Binance Smart Chain." },
];

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: topPerformingAssets.map(asset => ({
    label: asset.asset,
    data: asset.return,
    borderColor: asset.color,
    backgroundColor: `${asset.color}33`,
    fill: false,
  }))
};

const options = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Return (%)'
      },
      beginAtZero: true
    }
  }
};

const TopPerformingAssets = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAsset, setSelectedAsset] = React.useState(null);

  const handleMoreDetails = (asset) => {
    setSelectedAsset(asset);
    onOpen();
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Top Performing Assets
      </Text>
      <Box height="400px" mb="20px">
        <Line data={data} options={options} />
      </Box>
      <Stack spacing="20px">
        {topPerformingAssets.map((asset) => (
          <Box key={asset.id} p="15px" borderWidth="1px" borderRadius="md" display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Image src={asset.icon} boxSize="30px" borderRadius="full" mr="10px" />
              <Box>
                <Text fontSize="md">
                  <strong>Asset:</strong> {asset.asset}
                </Text>
                <Text fontSize="md">
                  <strong>Return:</strong> {asset.return[asset.return.length - 1]}%
                </Text>
                <Link color="teal.500" onClick={() => handleMoreDetails(asset)}>
                  View Historical Data
                </Link>
              </Box>
            </Box>
            <Button colorScheme="teal" size="sm" onClick={() => handleMoreDetails(asset)}>
              More Details
            </Button>
          </Box>
        ))}
      </Stack>

      {selectedAsset && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Asset Details: {selectedAsset.asset}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md">
                <strong>Asset:</strong> {selectedAsset.asset}
              </Text>
              <Text fontSize="md">
                <strong>Current Return:</strong> {selectedAsset.return[selectedAsset.return.length - 1]}%
              </Text>
              <Text fontSize="md">
                <strong>Details:</strong> {selectedAsset.details}
              </Text>
              <Box mt="4">
                <Link color="teal.500" href={`/historical-data/${selectedAsset.asset.toLowerCase()}`} isExternal>
                  View Detailed Metrics and Historical Data
                </Link>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default TopPerformingAssets;
