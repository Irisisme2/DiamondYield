import React, { useState } from "react";
import { Box, Text, Stack, Image, Select, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";
import Property7 from "assets/img/nfts/ubit.png";

const transactions = [
  { id: 1, date: "2024-07-14", type: "Staking", asset: "BTC", amount: 1.5, status: "Completed", details: "Staking for 6 months" },
  { id: 2, date: "2024-07-13", type: "Liquid Farming", asset: "ETH", amount: 2.0, status: "Pending", details: "Farming in pool XYZ since 2024-01-01" },
  { id: 3, date: "2024-07-12", type: "Staking", asset: "ADA", amount: 500, status: "Completed", details: "Staking for 12 months" },
  { id: 4, date: "2024-07-11", type: "Trade", asset: "DOT", amount: 300, status: "Completed", details: "Trade completed on 2024-07-11" },
  { id: 5, date: "2024-07-10", type: "Staking", asset: "BNB", amount: 3.0, status: "Completed", details: "Staking for 3 months" },
  { id: 6, date: "2024-07-09", type: "Liquid Farming", asset: "SQL", amount: 700, status: "Pending", details: "Farming in pool ABC since 2024-02-01" },
  { id: 7, date: "2024-07-08", type: "Staking", asset: "UBIT", amount: 1800, status: "Completed", details: "Staking for 24 months" },
];

const getAssetIcon = (asset) => {
  switch (asset) {
    case "BTC":
      return Property1;
    case "ETH":
      return Property2;
    case "ADA":
      return Property3;
    case "DOT":
      return Property4;
    case "BNB":
      return Property5;
    case "SQL":
      return Property6;
    case "UBIT":
      return Property7;
    default:
      return null;
  }
};

const RecentTransactions = () => {
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterAmountFrom, setFilterAmountFrom] = useState("");
  const [filterAmountTo, setFilterAmountTo] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleFilter = () => {
    let filtered = [...transactions];

    if (filterDateFrom && filterDateTo) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const fromDate = new Date(filterDateFrom);
        const toDate = new Date(filterDateTo);
        return transactionDate >= fromDate && transactionDate <= toDate;
      });
    }
    if (filterType) {
      filtered = filtered.filter((transaction) => transaction.type.includes(filterType));
    }
    if (filterAmountFrom && filterAmountTo) {
      filtered = filtered.filter((transaction) => {
        const amount = transaction.amount;
        return amount >= parseFloat(filterAmountFrom) && amount <= parseFloat(filterAmountTo);
      });
    }

    setFilteredTransactions(filtered);
  };

  const clearFilters = () => {
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterType("");
    setFilterAmountFrom("");
    setFilterAmountTo("");
    setFilteredTransactions(transactions);
  };

  const handleMoreDetails = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Recent Transactions
      </Text>
      <Box mb="20px">
        <Stack direction={{ base: "column", md: "row" }} spacing="10px">
          <Select placeholder="Filter by Type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Staking">Staking</option>
            <option value="Liquid Farming">Liquid Farming</option>
            <option value="Trade">Trade</option>
          </Select>
          <Input
            placeholder="From Date (YYYY-MM-DD)"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
          <Input
            placeholder="To Date (YYYY-MM-DD)"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
          />
          <Input
            placeholder="From Amount"
            value={filterAmountFrom}
            onChange={(e) => setFilterAmountFrom(e.target.value)}
          />
          <Input
            placeholder="To Amount"
            value={filterAmountTo}
            onChange={(e) => setFilterAmountTo(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleFilter}>
            Apply Filters
          </Button>
          <Button colorScheme="gray" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Stack>
      </Box>
      <Stack spacing="20px">
        {filteredTransactions.map((transaction) => (
          <Box key={transaction.id} p="15px" borderWidth="1px" borderRadius="md" display="flex" alignItems="center">
            <Image src={getAssetIcon(transaction.asset)} alt={transaction.asset} boxSize="30px" objectFit="contain" mr="10px" />
            <Box flex="1">
              <Text fontSize="md">
                <strong>Date:</strong> {transaction.date}
              </Text>
              <Text fontSize="md">
                <strong>Type:</strong> {transaction.type}
              </Text>
              <Text fontSize="md">
                <strong>Asset:</strong> {transaction.asset}
              </Text>
              <Text fontSize="md">
                <strong>Amount:</strong> {transaction.amount}
              </Text>
              <Text fontSize="md">
                <strong>Status:</strong> {transaction.status}
              </Text>
            </Box>
            <Button colorScheme="teal" size="sm" onClick={() => handleMoreDetails(transaction)}>
              More Details
            </Button>
          </Box>
        ))}
      </Stack>

      {selectedTransaction && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md">
                <strong>Date:</strong> {selectedTransaction.date}
              </Text>
              <Text fontSize="md">
                <strong>Type:</strong> {selectedTransaction.type}
              </Text>
              <Text fontSize="md">
                <strong>Asset:</strong> {selectedTransaction.asset}
              </Text>
              <Text fontSize="md">
                <strong>Amount:</strong> {selectedTransaction.amount}
              </Text>
              <Text fontSize="md">
                <strong>Status:</strong> {selectedTransaction.status}
              </Text>
              <Text fontSize="md">
                <strong>Details:</strong> {selectedTransaction.details}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default RecentTransactions;
