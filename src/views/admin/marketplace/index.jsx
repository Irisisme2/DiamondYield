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
import Banner from "views/admin/marketplace/components/Banner";
import Card from "components/card/Card.js";
import LastStakes from "views/admin/marketplace/components/Laststakes"; // Import komponentu LastStakes

const stakingPools = [
  {
    id: 1,
    name: 'ETH Staking Pool',
    description: 'Earn rewards by staking Ethereum tokens.',
    apy: '5%',
    currentRates: '1 ETH = 3450 USD',
    options: 'Weekly payouts',
    image: Property2,
    formFields: [
      { label: 'ETH Amount', type: 'number', placeholder: 'Enter ETH amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 2,
    name: 'BTC Staking Pool',
    description: 'Stake Bitcoin for monthly rewards.',
    apy: '7%',
    currentRates: '1 BTC = 58 000 USD',
    options: 'Monthly payouts',
    image: Property1,
    formFields: [
      { label: 'BTC Amount', type: 'number', placeholder: 'Enter BTC amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 3,
    name: 'ADA Staking Pool',
    description: 'Stake ADA tokens and earn ADA rewards.',
    apy: '6.5%',
    currentRates: '1 ADA = 0,41 USD',
    options: 'Monthly payouts',
    image: Property3,
    formFields: [
      { label: 'ADA Amount', type: 'number', placeholder: 'Enter ADA amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 4,
    name: 'DOT Staking Pool',
    description: 'Stake DOT tokens for weekly rewards.',
    apy: '8%',
    currentRates: '1 DOT = 6,09 USD',
    options: 'Weekly payouts',
    image: Property4,
    formFields: [
      { label: 'DOT Amount', type: 'number', placeholder: 'Enter DOT amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 5,
    name: 'BNB Staking Pool',
    description: 'Earn BNB rewards by staking BNB tokens.',
    apy: '6%',
    currentRates: '1 BNB = 533,98 USD',
    options: 'Monthly payouts',
    image: Property5,
    formFields: [
      { label: 'BNB Amount', type: 'number', placeholder: 'Enter BNB amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 6,
    name: 'SOL Staking Pool',
    description: 'Stake SOL tokens for daily rewards.',
    apy: '9%',
    currentRates: '1 SOL = 136,82 USD',
    options: 'Daily payouts',
    image: Property6,
    formFields: [
      { label: 'SOL Amount', type: 'number', placeholder: 'Enter SOL amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
];

const Marketplace = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPool, setSelectedPool] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    period: "1 month"
  });
  const [lastStakes, setLastStakes] = useState([]); // Stan przechowujący listę ostatnich stawek

  const handleStakeClick = (poolId) => {
    setSelectedPool(poolId);
    onOpen();
  };

  const handleStake = () => {
    // Dodanie nowej stawki do listy lastStakes po zatwierdzeniu formularza
    const pool = stakingPools.find(pool => pool.id === selectedPool);
    const newStake = {
      poolName: pool.name,
      amount: formData.amount,
      stakingPeriod: formData.period
    };
    setLastStakes([...lastStakes, newStake]);
    onClose(); // Zamknięcie modala po dodaniu stawki
    setFormData({ amount: "", period: "1 month" }); // Zresetowanie formularza
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFormFields = () => {
    if (!selectedPool) return null;

    const pool = stakingPools.find(pool => pool.id === selectedPool);

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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{ base: "1fr", xl: "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display="grid"
      >
        <Flex flexDirection="column" alignItems="left">
        <Banner style={{ maxWidth: "100%", margin: "auto" }} /> {/* Zaktualizowany baner */}
          <Box mt="40px"> {/* Dodatkowy margines górny */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
            {stakingPools.map(pool => (
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
                  <strong>APY:</strong> {pool.apy}
                </Text>
                <Text mt="10px" color={textColor} fontSize="md">
                  <strong>Current Rates:</strong> {pool.currentRates}
                </Text>
                <Text mt="10px" color={textColor} fontSize="md">
                  <strong>Options:</strong> {pool.options}
                </Text>
                <Button mt="10px" colorScheme="blue" onClick={() => handleStakeClick(pool.id)} w="full">
                  Stake
                </Button>
              </Card>
            ))}
          </SimpleGrid>
          </Box>
        </Flex>

        {/* Komponent LastStakes po prawej stronie */}
        <Flex direction="column" gridColumn="2 / 3" alignItems="center">
          <LastStakes lastStakes={lastStakes} />
        </Flex>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stake in {stakingPools.find(pool => pool.id === selectedPool)?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderFormFields()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleStake}>Stake</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Marketplace;
