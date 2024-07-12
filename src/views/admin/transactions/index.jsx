// Transactions.js

import React, { useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
  useColorModeValue,
  Image,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";

import Property1 from "assets/img/nfts/btc1.jpg";
import Property2 from "assets/img/nfts/eth.png";
import Property3 from "assets/img/nfts/ada.png";
import Property4 from "assets/img/nfts/dot.png";
import Property5 from "assets/img/nfts/bnb.png";
import Property6 from "assets/img/nfts/sql.png";
import Property7 from "assets/img/nfts/ubit.png"; 

const transactions = [
  {
    date: "12 Jul 2023, 14:32",
    type: "Staking",
    amount: "150 UBIT",
    status: "Completed",
    token: "UBIT",
    icon: Property7,
  },
  {
    date: "15 Jul 2023, 09:21",
    type: "Unstaking",
    amount: "50 UBIT",
    status: "In Progress",
    token: "UBIT",
    icon: Property7,
  },
  {
    date: "18 Jul 2023, 17:45",
    type: "Reward",
    amount: "10 UBIT",
    status: "Completed",
    token: "UBIT",
    icon: Property7,
  },
  {
    date: "20 Jul 2023, 12:00",
    type: "Staking",
    amount: "200 UBIT",
    status: "Failed",
    token: "UBIT",
    icon: Property7,
  },
  {
    date: "22 Jul 2023, 10:00",
    type: "Staking",
    amount: "2 ETH",
    status: "Completed",
    token: "ETH",
    icon: Property2,
  },
  {
    date: "25 Jul 2023, 11:30",
    type: "Unstaking",
    amount: "0.5 ETH",
    status: "In Progress",
    token: "ETH",
    icon: Property2,
  },
  {
    date: "28 Jul 2023, 09:15",
    type: "Reward",
    amount: "0.1 ETH",
    status: "Completed",
    token: "ETH",
    icon: Property2,
  },
  {
    date: "30 Jul 2023, 16:45",
    type: "Staking",
    amount: "3 BTC",
    status: "Completed",
    token: "BTC",
    icon: Property1,
  },
  {
    date: "01 Aug 2023, 13:00",
    type: "Unstaking",
    amount: "1 BTC",
    status: "In Progress",
    token: "BTC",
    icon: Property1,
  },
  {
    date: "03 Aug 2023, 18:00",
    type: "Reward",
    amount: "0.05 BTC",
    status: "Completed",
    token: "BTC",
    icon: Property1,
  },
  {
    date: "05 Aug 2023, 12:30",
    type: "Staking",
    amount: "1000 ADA",
    status: "Completed",
    token: "ADA",
    icon: Property3,
  },
  {
    date: "08 Aug 2023, 14:45",
    type: "Unstaking",
    amount: "300 ADA",
    status: "In Progress",
    token: "ADA",
    icon: Property3,
  },
  {
    date: "10 Aug 2023, 10:20",
    type: "Reward",
    amount: "50 ADA",
    status: "Completed",
    token: "ADA",
    icon: Property3,
  },
  {
    date: "12 Aug 2023, 09:30",
    type: "Staking",
    amount: "500 DOT",
    status: "Completed",
    token: "DOT",
    icon: Property4,
  },
  {
    date: "15 Aug 2023, 08:15",
    type: "Unstaking",
    amount: "150 DOT",
    status: "In Progress",
    token: "DOT",
    icon: Property4,
  },
  {
    date: "17 Aug 2023, 12:45",
    type: "Reward",
    amount: "25 DOT",
    status: "Completed",
    token: "DOT",
    icon: Property4,
  },
  {
    date: "20 Aug 2023, 11:00",
    type: "Staking",
    amount: "10 BNB",
    status: "Completed",
    token: "BNB",
    icon: Property5,
  },
  {
    date: "23 Aug 2023, 13:45",
    type: "Unstaking",
    amount: "3 BNB",
    status: "In Progress",
    token: "BNB",
    icon: Property5,
  },
  {
    date: "25 Aug 2023, 09:30",
    type: "Reward",
    amount: "1 BNB",
    status: "Completed",
    token: "BNB",
    icon: Property5,
  },
  {
    date: "27 Aug 2023, 16:30",
    type: "Staking",
    amount: "200 SOL",
    status: "Completed",
    token: "SOL",
    icon: Property6,
  },
  {
    date: "30 Aug 2023, 14:00",
    type: "Unstaking",
    amount: "50 SOL",
    status: "In Progress",
    token: "SOL",
    icon: Property6,
  },
  {
    date: "01 Sep 2023, 18:30",
    type: "Reward",
    amount: "10 SOL",
    status: "Completed",
    token: "SOL",
    icon: Property6,
  },
];

const Transactions = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [filterOptions, setFilterOptions] = useState({
    fromDate: "",
    toDate: "",
    minAmount: "",
    maxAmount: "",
    status: "",
    token: "",
  });

  const handleFilter = () => {
    let filteredData = [...transactions];

    if (filterOptions.fromDate && filterOptions.toDate) {
      filteredData = filteredData.filter(
        (transaction) =>
          new Date(transaction.date) >= new Date(filterOptions.fromDate) &&
          new Date(transaction.date) <= new Date(filterOptions.toDate)
      );
    }

    if (filterOptions.minAmount) {
      filteredData = filteredData.filter(
        (transaction) => parseFloat(transaction.amount) >= parseFloat(filterOptions.minAmount)
      );
    }

    if (filterOptions.maxAmount) {
      filteredData = filteredData.filter(
        (transaction) => parseFloat(transaction.amount) <= parseFloat(filterOptions.maxAmount)
      );
    }

    if (filterOptions.status) {
      filteredData = filteredData.filter(
        (transaction) => transaction.status.toLowerCase() === filterOptions.status.toLowerCase()
      );
    }

    if (filterOptions.token) {
      filteredData = filteredData.filter(
        (transaction) => transaction.token.toLowerCase() === filterOptions.token.toLowerCase()
      );
    }

    setFilteredTransactions(filteredData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  const handleReset = () => {
    setFilterOptions({
      fromDate: "",
      toDate: "",
      minAmount: "",
      maxAmount: "",
      status: "",
      token: "",
    });
    setFilteredTransactions(transactions);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mb="20px">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr 1fr" }}
          gap={{ base: "10px", md: "10px" }}
        >
          <Input
            type="date"
            name="fromDate"
            value={filterOptions.fromDate}
            onChange={handleChange}
            placeholder="From Date"
          />
          <Input
            type="date"
            name="toDate"
            value={filterOptions.toDate}
            onChange={handleChange}
            placeholder="To Date"
          />
          <Input
            type="number"
            name="minAmount"
            value={filterOptions.minAmount}
            onChange={handleChange}
            placeholder="Min Amount"
          />
          <Input
            type="number"
            name="maxAmount"
            value={filterOptions.maxAmount}
            onChange={handleChange}
            placeholder="Max Amount"
          />
          <Select name="status" value={filterOptions.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="completed">Completed</option>
            <option value="in progress">In Progress</option>
            <option value="failed">Failed</option>
          </Select>
          <Select name="token" value={filterOptions.token} onChange={handleChange}>
            <option value="">Select Token</option>
            <option value="ubit">UBIT</option>
            <option value="eth">ETH</option>
            <option value="btc">BTC</option>
            <option value="ada">ADA</option>
            <option value="dot">DOT</option>
            <option value="bnb">BNB</option>
            <option value="sol">SOL</option>
          </Select>
          <Button onClick={handleFilter}>Filter</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Grid>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
        {filteredTransactions.map((transaction, index) => (
          <Card
            key={index}
            height="auto"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="20px"
          >
            <Image src={transaction.icon} alt={transaction.token} height="100px" objectFit="contain" />
            <Text mt="10px" color={textColor} fontSize="md">
              <strong>DATE & TIME:</strong> {transaction.date}
            </Text>
            <Text mt="10px" color={textColor} fontSize="md">
              <strong>TRANSACTION TYPE:</strong> {transaction.type}
            </Text>
            <Text mt="10px" color={textColor} fontSize="md">
              <strong>AMOUNT:</strong> {transaction.amount}
            </Text>
            <Text mt="10px" color={textColor} fontSize="md">
              <strong>STATUS:</strong> {transaction.status}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Transactions;
