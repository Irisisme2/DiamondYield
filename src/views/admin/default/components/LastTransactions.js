import React, { useState, useEffect } from "react";
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
import ColumnsTable from "views/admin/default/variables/columnstable";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";

const Transactions = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    fromDate: "",
    toDate: "",
    minAmount: "",
    maxAmount: "",
    status: "",
    token: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("https://api.ubitscan.com/api?module=transaction&action=gettxinfo&txhash={transactionHash}");
        const data = await response.json();
        setTransactions(data.result);
        setFilteredTransactions(data.result);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

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

      <Box mb="20px">
        <Text color={textColor} fontSize="2xl">
          Transactions
        </Text>
      </Box>

      <ColumnsTable columnsData={columnsDataComplex} tableData={filteredTransactions} />
    </Box>
  );
};

export default Transactions;
