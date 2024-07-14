
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  Options,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from 'react';
import { MdBarChart, MdAttachMoney, MdAddTask, MdFileCopy, MdTrendingUp, MdAccountBalanceWallet,  MdMonetizationOn,MdTimeline, MdSecurity, } from "react-icons/md";
import Recenttransactions from "views/admin/marketplace/components/Recenttransactions";
import Earnings from "views/admin/marketplace/components/Earnings";
import AssetAllocationChart from "views/admin/marketplace/components/AssetAllocationChart";
import TopPerformingAssets  from "views/admin/marketplace/components/topPerformingAssets ";
import ActiveVsClosedStakes from "views/admin/marketplace/components/ActiveVsClosedStakes";
import AverageAPYChart from "views/admin/dataTables/components/AverageAPYChart";


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
     <SimpleGrid columns={1} gap="20px" mb="20px">
        {/* Earnings na całej szerokości strony */}
        <Box>
          <Earnings />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={1} gap="20px" mb="20px">
        <Box>
          <Recenttransactions />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={1} gap="20px" mb="20px">
        <Box>
          <TopPerformingAssets />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={1} gap="20px" mb="20px">
        <Box p="15px" borderRadius="md">
          <Box mb="20px">
            <AssetAllocationChart />
          </Box>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="20px">
        <Box>
          <ActiveVsClosedStakes />
        </Box>
        <Box>
          <Card p="20px" mb="20px">
            <AverageAPYChart />
          </Card>
        </Box>
      </SimpleGrid>
    </Box>
  );
};