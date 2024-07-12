import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Upewnij się, że ścieżka jest poprawna

export default function ActionButtons(props) {
  const { ...rest } = props;
  const [actionMessage, setActionMessage] = useState('');
  const [showStakeForm, setShowStakeForm] = useState(false);
  const [showUnstakeForm, setShowUnstakeForm] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);

  // Chakra Color Mode
  const buttonBgColor = useColorModeValue('blue.500', 'blue.300');
  const buttonHoverBgColor = useColorModeValue('blue.600', 'blue.400');
  const buttonTextColor = useColorModeValue('white', 'gray.800');

  const handleStakeTokens = () => {
    setActionMessage('You clicked Stake More Tokens!');
    setShowStakeForm(true);
    setShowUnstakeForm(false);
    setShowClaimForm(false);
  };

  const handleUnstakeTokens = () => {
    setActionMessage('You clicked Unstake Tokens!');
    setShowStakeForm(false);
    setShowUnstakeForm(true);
    setShowClaimForm(false);
  };

  const handleClaimRewards = () => {
    setActionMessage('You clicked Claim Rewards!');
    setShowStakeForm(false);
    setShowUnstakeForm(false);
    setShowClaimForm(true);
  };

  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Text color="secondaryGray.900" fontSize="lg" fontWeight="600" mb="16px">
        Action Buttons
      </Text>

      <Flex direction="column" gap="24px">
        <Button
          bg={buttonBgColor}
          _hover={{ bg: buttonHoverBgColor }}
          color={buttonTextColor}
          fontWeight="600"
          px="60px"
          py="20px"
          fontSize="xl"
          onClick={handleStakeTokens}
        >
          Stake More Tokens
        </Button>

        <Button
          bg={buttonBgColor}
          _hover={{ bg: buttonHoverBgColor }}
          color={buttonTextColor}
          fontWeight="600"
          px="60px"
          py="20px"
          fontSize="xl"
          onClick={handleUnstakeTokens}
        >
          Unstake Tokens
        </Button>

        <Button
          bg={buttonBgColor}
          _hover={{ bg: buttonHoverBgColor }}
          color={buttonTextColor}
          fontWeight="600"
          px="60px"
          py="20px"
          fontSize="xl"
          onClick={handleClaimRewards}
        >
          Claim Rewards
        </Button>
      </Flex>

      {showStakeForm && (
        <Box mt="20px">
          <FormControl>
            <FormLabel>Amount to Stake:</FormLabel>
            <Input type="number" placeholder="Enter amount to stake" />
          </FormControl>
          <Button mt="10px" colorScheme="blue" onClick={() => setShowStakeForm(false)}>
            Stake
          </Button>
        </Box>
      )}

      {showUnstakeForm && (
        <Box mt="20px">
          <FormControl>
            <FormLabel>Amount to Unstake:</FormLabel>
            <Input type="number" placeholder="Enter amount to unstake" />
          </FormControl>
          <Button mt="10px" colorScheme="blue" onClick={() => setShowUnstakeForm(false)}>
            Unstake
          </Button>
        </Box>
      )}

      {showClaimForm && (
        <Box mt="20px">
          <Button colorScheme="blue" onClick={() => setShowClaimForm(false)}>
            Claim All Rewards
          </Button>
        </Box>
      )}

      {actionMessage && (
        <Box mt="20px">
          <Text color="gray.600">{actionMessage}</Text>
        </Box>
      )}
    </Card>
  );
}
