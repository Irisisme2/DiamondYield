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
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from 'react';
import { MdBarChart, MdAttachMoney, MdAddTask, MdFileCopy, MdTrendingUp, MdAccountBalanceWallet,  MdMonetizationOn, MdTimeline, MdSecurity } from "react-icons/md";
import ActiveStrategies from "views/admin/transactions/components/ActiveStrategies";
import NewStrategies from "views/admin/transactions/components/NewStrategies";

export default function UserReports() {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "20px" }}>
      <SimpleGrid columns={1} gap='20px' mb='20px'>
        <ActiveStrategies />
        <NewStrategies />
      </SimpleGrid>
    </Box>
  );
};
