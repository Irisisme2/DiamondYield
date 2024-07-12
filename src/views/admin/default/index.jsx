// Horizon UI - v1.1.0
// Product Page: https://www.horizon-ui.com/
// Copyright 2023 Horizon UI (https://www.horizon-ui.com/)
// Designed and Coded by Simmmple

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from 'react';
import { MdBarChart, MdAttachMoney, MdAddTask, MdFileCopy, MdTrendingUp, MdAccountBalanceWallet } from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import LastTransactions from "views/admin/default/components/LastTransactions";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import Staking from "views/admin/default/components/Staking";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import Web3 from 'web3';

import axios from 'axios';

export default function UserReports() {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const [accountBalance, setAccountBalance] = useState(0); // Initial state for account balance

  useEffect(() => {
    async function fetchAccountBalance(address) {
      try {
        const response = await axios.get(`https://ubitscan.io/api?module=account&action=balance&address=${address}`);

        if (response.data && response.data.result) {
          const balanceInWei = response.data.result;
          const balanceInUBIT = convertWeiToUBIT(balanceInWei);
          setAccountBalance(balanceInUBIT);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania salda:', error);
      }
    }

    async function loadMetamask() {
      // Sprawdzanie czy Metamask jest zainstalowany
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        try {
          // Prośba o dostęp do konta Metamask
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Pobieranie adresu aktualnie zalogowanego użytkownika
          const accounts = await web3.eth.getAccounts();

          if (accounts.length > 0) {
            const userAddress = accounts[0];
            fetchAccountBalance(userAddress);
          } else {
            console.error('Nie znaleziono konta Metamask.');
          }
        } catch (error) {
          console.error('Brak pozwolenia na dostęp do konta Metamask:', error);
        }
      } else {
        console.error('Metamask nie jest zainstalowany w przeglądarce.');
      }
    }

    loadMetamask();
  }, []);

  function convertWeiToUBIT(weiAmount) {
    return weiAmount / 10**18; // Example conversion assuming 1 UBIT = 1e18 Wei
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap='20px'
        mb='20px'
      >
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdAccountBalanceWallet} color={brandColor} />}
            />
          }
          name='Account Balance'
          value={`${accountBalance} UBIT`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />}
            />
          }
          name='Total Staked Amount'
          value='800 UBIT'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdTrendingUp} color={brandColor} />}
            />
          }
          name='Total Rewards'
          value='200 UBIT'
        />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='apy'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select id='apy' variant='mini' mt='5px' me='0px' defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='APY'
          value='15%'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <Staking />
        <WeeklyRevenue />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <LastTransactions columnsData={columnsDataComplex} tableData={tableDataComplex} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}