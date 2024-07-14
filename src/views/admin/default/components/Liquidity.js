import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  VStack,
  HStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Card from "components/card/Card"; // Upewnij się, że ścieżka jest poprawna
import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";

const LiquidityPools = () => {
  const [liquidityPools, setLiquidityPools] = useState([
    {
      id: 1,
      name: "Bitcoin Pool",
      apr: "8%",
      totalLiquidity: 100000,
      userShare: 25,
      icon: Property1,
    },
    {
      id: 2,
      name: "Ethereum Pool",
      apr: "12%",
      totalLiquidity: 150000,
      userShare: 15,
      icon: Property2,
    },
    {
      id: 3,
      name: "Cardano Pool",
      apr: "10%",
      totalLiquidity: 80000,
      userShare: 20,
      icon: Property3,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removePoolId, setRemovePoolId] = useState(null);

  const handleAddLiquidity = (poolId) => {
    setShowAddModal(true);
  };

  const handleRemoveLiquidity = (poolId) => {
    setRemovePoolId(poolId);
    setShowRemoveModal(true);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
    setRemovePoolId(null);
  };

  const handleConfirmRemove = () => {
    const updatedPools = liquidityPools.filter((pool) => pool.id !== removePoolId);
    setLiquidityPools(updatedPools);
    setShowRemoveModal(false);
    setRemovePoolId(null);
  };

  const handleAddFormSubmit = (formData) => {
    const { poolId, amountToAdd, details } = formData;
    const updatedPools = liquidityPools.map((pool) => {
      if (pool.id === poolId) {
        const newLiquidity = pool.totalLiquidity + parseFloat(amountToAdd);
        const newUserShare = ((newLiquidity / pool.totalLiquidity) * pool.userShare).toFixed(2);
        return {
          ...pool,
          totalLiquidity: newLiquidity,
          userShare: parseFloat(newUserShare),
        };
      }
      return pool;
    });
    setLiquidityPools(updatedPools);
    setShowAddModal(false);
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box>
      <Flex alignItems="center" mb="20px">
        <Text fontSize="xl" fontWeight="bold" mr="10px">
          Active Liquidity Pools
        </Text>
      </Flex>

      <VStack spacing="20px" align="stretch">
        {liquidityPools.map((pool) => (
          <Card key={pool.id} p="15px" boxShadow="lg">
            <Flex justify="space-between" align="center">
              <Flex align="center">
                <Image
                  src={pool.icon}
                  alt={pool.name}
                  boxSize="50px"
                  borderRadius="full"
                  mr="15px"
                />
                <Text fontSize="xl" fontWeight="bold" color={textColor} mb="3px">
                  {pool.name}
                </Text>
              </Flex>
              <HStack>
                <Button
                  colorScheme="green"
                  size="sm"
                  onClick={() => handleAddLiquidity(pool.id)}
                >
                  Add Liquidity
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveLiquidity(pool.id)}
                >
                  Remove Liquidity
                </Button>
              </HStack>
            </Flex>
            <Box mt="10px">
              <Text fontSize="sm" color={textColor}>
                APR: {pool.apr}
              </Text>
              <Text fontSize="sm" color={textColor}>
                Total Liquidity: ${pool.totalLiquidity.toLocaleString()}
              </Text>
              <Text fontSize="sm" color={textColor}>
                Your Share: {pool.userShare}%
              </Text>
            </Box>
          </Card>
        ))}
      </VStack>

      {/* Modal for adding liquidity */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Liquidity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddFormSubmit({
                  poolId: parseInt(formData.get("poolId")),
                  amountToAdd: parseFloat(formData.get("amountToAdd")),
                  details: formData.get("details"),
                });
              }}
            >
              <VStack spacing="20px" align="stretch">
                <FormControl>
                  <FormLabel>Pool</FormLabel>
                  <Input type="text" defaultValue="Bitcoin Pool" isReadOnly />
                  <input type="hidden" name="poolId" value={1} />
                </FormControl>
                <FormControl>
                  <FormLabel>Amount to Add</FormLabel>
                  <Input
                    type="number"
                    step="0.01"
                    name="amountToAdd"
                    placeholder="Enter amount"
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Additional Details</FormLabel>
                  <Input
                    type="text"
                    name="details"
                    placeholder="Enter details"
                  />
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              Add
            </Button>
            <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for removing liquidity */}
      <Modal isOpen={showRemoveModal} onClose={handleCancelRemove}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Liquidity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to remove liquidity from this pool?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleConfirmRemove}>
              Yes
            </Button>
            <Button onClick={handleCancelRemove}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LiquidityPools;
