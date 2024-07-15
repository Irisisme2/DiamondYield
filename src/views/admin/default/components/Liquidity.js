import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
  useColorModeValue,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import Web3 from "web3"; // Import Web3 library
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
  const [account_id, setAccountId] = useState(""); // State to hold account ID

  useEffect(() => {
    // Function to fetch account ID from MetaMask or other web3 provider
    const fetchAccountId = async () => {
      if (typeof window.ethereum !== "undefined") {
        // Check if MetaMask (or another Ethereum-enabled browser) is installed
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user accounts
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          }); // Get user accounts
          setAccountId(accounts[0]); // Set the first account as the account ID
        } catch (error) {
          console.error("Error fetching account ID:", error);
        }
      } else {
        console.error("MetaMask is not installed"); // Handle case where MetaMask is not installed
      }
    };

    fetchAccountId(); // Fetch account ID when component mounts
  }, []);

  const fetchTransactions = async () => {
    try {
      if (!account_id) return; // Exit early if account_id is not defined
      const response = await fetch(
        `https://api.diamante-network.com/accounts/${account_id}/transactions`
      );
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data); // Assuming initially all transactions are filtered
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleFilter = () => {
    // Implement your filtering logic here
    // Example: Filter transactions based on filterOptions
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
    setFilteredTransactions(transactions); // Reset filtered transactions to all transactions
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mb="20px">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr 1fr" }}
          gap={{ base: "10px", md: "10px" }}
        >
          {/* Implement your input fields and buttons here for filtering */}
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
