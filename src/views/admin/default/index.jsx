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
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from 'react';
import { MdBarChart, MdAttachMoney, MdAddTask, MdFileCopy, MdTrendingUp, MdAccountBalanceWallet,  MdMonetizationOn,MdTimeline, MdSecurity, } from "react-icons/md";
import ActiveStakes from "views/admin/default/components/Activestakes";
import Loans from "views/admin/default/components/Loans";
import PieCard from "views/admin/default/components/PieCard";
import Liquidity from "views/admin/default/components/Liquidity";
import Staking from "views/admin/default/components/Staking";
import Earnings from "views/admin/default/components/WeeklyRevenue";
import TopPerformingAssets from "views/admin/default/components/TopPerformingAssets";
import axios from 'axios';
import { ethers } from 'ethers'; // Import ethers

export default function UserReports() {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  // Stan do przechowywania wartości aktywów
  const [totalAssetValue, setTotalAssetValue] = useState(null);
  const [earningsSummary, setEarningsSummary] = useState(null);
  const [yieldFarmingROI, setYieldFarmingROI] = useState(null);
  const [stakingRewards, setStakingRewards] = useState(null);
  const [historicalPerformance, setHistoricalPerformance] = useState(null);
  const [securityLevel, setSecurityLevel] = useState(null);

  // Efekt pobierający dane z API Diamante
  useEffect(() => {
    // Funkcja do pobierania wartości aktywów z API Diamante
    const fetchAssetValue = async () => {
      try {
        // Przykładowe zapytanie GET do API Diamante (dostosuj do swojego API)
        const response = await axios.get('https://your-diamante-api.com/asset-value');

        // Pobranie danych z odpowiedzi API
        const data = response.data;

        // Ustawienie danych w stanie komponentu
        setTotalAssetValue(data.totalAssetValue);
        setEarningsSummary(data.earningsSummary);
        setYieldFarmingROI(data.yieldFarmingROI);
        setStakingRewards(data.stakingRewards);
        setHistoricalPerformance(data.historicalPerformance);
        setSecurityLevel(data.securityLevel);
      } catch (error) {
        console.error('Error fetching asset values:', error);
      }
    };

    // Wywołanie funkcji do pobierania danych po zamontowaniu komponentu
    fetchAssetValue();
  }, []); // Pobieranie danych tylko raz po zamontowaniu komponentu

  // Funkcja do sprawdzenia dostępności MetaMask
  const checkMetaMaskAvailability = async () => {
    // Sprawdzenie czy MetaMask jest dostępny w przeglądarce
    if (window.ethereum) {
      // Utworzenie nowej instancji ethers.providers.Web3Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      try {
        // Żądanie uprawnień od użytkownika do interfejsu Ethereum
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Pobranie adresu aktywnego konta
        const accounts = await provider.listAccounts();
        console.log('MetaMask is connected:', accounts[0]);
        
        // Możesz tutaj wykonać dodatkowe operacje po podłączeniu MetaMask
        // np. wysyłanie transakcji, czytanie stanu konta itp.
      } catch (error) {
        console.error('User denied account access:', error);
      }
    } else {
      console.error('MetaMask is not installed!');
    }
  };

  // Wywołanie funkcji do sprawdzenia dostępności MetaMask po załadowaniu komponentu
  useEffect(() => {
    checkMetaMaskAvailability();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Mini Statistics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap='20px' mb='20px'>
        {/* Total Asset Value */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<MdBarChart size='32px' color={brandColor} />}
            />
          }
          name='Total Asset Value'
          value={totalAssetValue ? `$${totalAssetValue}` : '$0'}
        />

        {/* Earnings Summary */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />}
            />
          }
          name='Earnings Summary'
          value='$350.4'
        />

        {/* Yield Farming ROI */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='28px' h='28px' as={MdTrendingUp}  color={brandColor} />}
            />
          }
          name='Yield Farming ROI'
          value='+15%'
        />

        {/* Staking Rewards */}
        <MiniStatistics
          startContent={
            <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={<Icon w='32px' h='32px' as={MdMonetizationOn} color={brandColor} />}
          />
        }
          name='Staking Rewards'
          value='$120.50'
        />

        {/* Historical Performance */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdTimeline} color={brandColor} />}
            />
          }
          name='Historical Performance'
          value='High'
        />

        {/* Security Level */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdSecurity} color={brandColor} />}
            />
          }
          name='Security Level'
          value='High'
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <Staking />
        <Box p='15px' borderRadius='md'>
          <Box mb='20px'>
            <Earnings />
          </Box>
          <PieCard />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <ActiveStakes />
        <Liquidity />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TopPerformingAssets />
        <Loans />
      </SimpleGrid>
    </Box>
  );
};
