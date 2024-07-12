import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Icon,
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
import {
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdEuroSymbol,
  MdAttachFile,
  MdDateRange,
} from "react-icons/md";

// Importowanie obrazów
import Property1 from "assets/img/nfts/btc.png";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";

const stakingPools = [
  {
    id: 1,
    name: 'ETH Staking Pool',
    description: 'Earn rewards by staking Ethereum tokens.',
    apy: '5%',
    currentRates: '1 ETH = 10 XYZ',
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
    currentRates: '1 BTC = 100 XYZ',
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
    currentRates: '1 ADA = 20 XYZ',
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
    currentRates: '1 DOT = 50 XYZ',
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
    currentRates: '1 BNB = 15 XYZ',
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
    currentRates: '1 SOL = 75 XYZ',
    options: 'Daily payouts',
    image: Property6,
    formFields: [
      { label: 'SOL Amount', type: 'number', placeholder: 'Enter SOL amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
];

export default function Marketplace() {
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
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "1fr", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
          <Banner />
          <Flex direction='column'>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap='20px'>
              {stakingPools.map(pool => (
                <Card
                  key={pool.id}
                  height="350px" // Większa wysokość kart
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  p="20px"
                >
                  <Image src={pool.image} alt={pool.name} height="150px" objectFit="cover" />
                  <Flex align='center' mt='10px'>
                    <Text color={textColor} fontSize='lg' fontWeight='bold'>
                      {pool.name}
                    </Text>
                  </Flex>
                  <Text mt='10px' color={textColor} fontSize='md'>
                    {pool.description}
                  </Text>
                  <Text mt='10px' color={textColor} fontSize='md'>
                    <strong>APY:</strong> {pool.apy}
                  </Text>
                  <Text mt='10px' color={textColor} fontSize='md'>
                    <strong>Current Rates:</strong> {pool.currentRates}
                  </Text>
                  <Text mt='10px' color={textColor} fontSize='md'>
                    <strong>Options:</strong> {pool.options}
                  </Text>
                  <Button
                    mt='10px'
                    colorScheme='blue'
                    onClick={() => handleStakeClick(pool.id)}
                    w='full'
                  >
                    Stake
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Flex>
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
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Stake</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
