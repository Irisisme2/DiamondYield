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

import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";
import Banner from "views/admin/dataTables/components/banner";
import Card from "components/card/Card.js";
import Calculator from "views/admin/dataTables/components/Calculator"; // Import komponentu Calculator
import ActivePools from "views/admin/dataTables/components/ActivePools"; // Import komponentu ActivePools

const liquidityPoolsData = [
  {
    id: 1,
    name: 'ETH Liquidity Pool',
    description: 'Provide liquidity for Ethereum tokens.',
    apr: '5%',
    totalLiquidity: '500 ETH',
    currentRates: '1 ETH = 3450 USD',
    image: Property2,
    formFields: [
      { label: 'ETH Amount', type: 'number', placeholder: 'Enter ETH amount' },
      { label: 'Lockup Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 2,
    name: 'BTC Liquidity Pool',
    description: 'Provide liquidity for Bitcoin tokens.',
    apr: '7%',
    totalLiquidity: '300 BTC',
    currentRates: '1 BTC = 58,000 USD',
    image: Property1,
    formFields: [
      { label: 'BTC Amount', type: 'number', placeholder: 'Enter BTC amount' },
      { label: 'Lockup Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 3,
    name: 'ADA Liquidity Pool',
    description: 'Provide liquidity for ADA tokens.',
    apr: '6.5%',
    totalLiquidity: '420,000 ADA',
    currentRates: '1 ADA = 0.41 USD',
    image: Property3,
    formFields: [
      { label: 'ADA Amount', type: 'number', placeholder: 'Enter ADA amount' },
      { label: 'Lockup Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 4,
    name: 'DOT Liquidity Pool',
    description: 'Provide liquidity for DOT tokens.',
    apr: '8%',
    totalLiquidity: '380,000 DOT',
    currentRates: '1 DOT = 6.09 USD',
    image: Property4,
    formFields: [
      { label: 'DOT Amount', type: 'number', placeholder: 'Enter DOT amount' },
      { label: 'Lockup Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 5,
    name: 'BNB Liquidity Pool',
    description: 'Provide liquidity for BNB tokens.',
    apr: '6%',
    totalLiquidity: '320 BNB',
    currentRates: '1 BNB = 533.98 USD',
    image: Property5,
    formFields: [
      { label: 'BNB Amount', type: 'number', placeholder: 'Enter BNB amount' },
      { label: 'Lockup Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 6,
    name: 'SOL Liquidity Pool',
    description: 'Provide liquidity for SOL tokens.',
    apr: '9%',
    totalLiquidity: '240 SOL',
    currentRates: '1 SOL = 136.82 USD',
    image: Property6,
    formFields: [
      { label: 'SOL Amount', type: 'number', placeholder: 'Enter SOL amount' },
      { label: 'Lockup Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
];

const Marketplace = () => {
  const [liquidityPools, setLiquidityPools] = useState(liquidityPoolsData);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPool, setSelectedPool] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    period: "1 month"
  });

  const handleStakeClick = (poolId) => {
    setSelectedPool(poolId);
    onOpen();
  };

  const handleStake = () => {
    if (!selectedPool) return;

    const updatedPools = liquidityPools.map(pool => {
      if (pool.id === selectedPool) {
        // Dodaj nową likwidność do istniejącej
        const amount = parseFloat(formData.amount);
        const currentLiquidity = parseFloat(pool.totalLiquidity.replace(/[,]/g, ''));
        const newTotalLiquidity = currentLiquidity + amount;

        return {
          ...pool,
          totalLiquidity: `${newTotalLiquidity.toFixed(2)} ${pool.totalLiquidity.split(' ')[1]}`,
        };
      }
      return pool;
    });

    setLiquidityPools(updatedPools);
    onClose(); // Zamknięcie modala po dodaniu stawki
    setFormData({ amount: "", period: "1 month" }); // Zresetowanie formularza
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFormFields = () => {
    if (!selectedPool) return null;

    const pool = liquidityPools.find(pool => pool.id === selectedPool);

    return (
      <>
        {pool.formFields.map((field) => (
          <Flex key={field.label} mb="0.5rem">
            <Text minW="120px">{field.label}:</Text>
            {field.type === 'number' ? (
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{ marginRight: '10px' }}
              />
            ) : (
              <Select
                name="period"
                value={formData.period}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{ marginRight: '10px' }}
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            )}
          </Flex>
        ))}
      </>
    );
  };

  // Funkcja sortowania
  const sortPools = (criteria) => {
    switch (criteria) {
      case 'apr':
        liquidityPools.sort((a, b) => parseFloat(b.apr) - parseFloat(a.apr));
        break;
      case 'liquidity':
        liquidityPools.sort((a, b) => parseFloat(b.totalLiquidity) - parseFloat(a.totalLiquidity));
        break;
      default:
        // Domyślne sortowanie według ID
        liquidityPools.sort((a, b) => a.id - b.id);
        break;
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{ base: "1fr", xl: "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display="grid"
      >
        <Flex flexDirection="column" alignItems="left">
          <Banner style={{ maxWidth: "100%", margin: "auto" }} />
          <Box mt="40px">
            <Flex justifyContent="space-between" mb="20px">
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                Available Liquidity Pools
              </Text>
              <Flex>
                <Text fontSize="md" mr="10px" color={textColor}>
                  Sort by:
                </Text>
                <Select
                  defaultValue="default"
                  onChange={(e) => sortPools(e.target.value)}
                  w="150px"
                  mr="10px"
                >
                  <option value="default">Default</option>
                  <option value="apr">APR</option>
                  <option value="liquidity">Total Liquidity</option>
                </Select>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {liquidityPools.map(pool => (
                <Card
                  key={pool.id}
                  height="600px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  p="20px"
                >
                  <Image src={pool.image} alt={pool.name} height="330px" objectFit="cover" />
                  <Flex align="center" mt="20px">
                    <Text color={textColor} fontSize="lg" fontWeight="bold">
                      {pool.name}
                    </Text>
                  </Flex>
                  <Text mt="10px" color={textColor} fontSize="md">
                    {pool.description}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>APR:</strong> {pool.apr}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Total Liquidity:</strong> {pool.totalLiquidity}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Current Rates:</strong> {pool.currentRates}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Options:</strong> {pool.options}
                  </Text>
                  <Button mt="10px" colorScheme="blue" onClick={() => handleStakeClick(pool.id)} w="full">
                    Add Liquidity
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        {/* Komponent Calculator po prawej stronie */}
        <Box p="20px" borderRadius="lg" >
        <Calculator />

    </Box>

        {/* Komponent ActivePools na całą szerokość kolumny */}
        <ActivePools />
        
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Liquidity to {liquidityPools.find(pool => pool.id === selectedPool)?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderFormFields()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleStake}>Add Liquidity</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Marketplace;
