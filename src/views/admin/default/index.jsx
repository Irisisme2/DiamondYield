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

export default function UserReports() {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

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
              icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />}
            />
          }
          name='Total Asset Value'
          value='$1,234,567'
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