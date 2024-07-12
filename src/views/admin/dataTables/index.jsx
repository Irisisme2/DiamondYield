import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Activestakes from "views/admin/dataTables/components/Activestakes";
import AverageAPYChart from "views/admin/dataTables/components/AverageAPYChart";
import PastStakes from "views/admin/dataTables/components/PastStakes";
import TotalEarningsSummary from "views/admin/dataTables/components/TotalEarningsSummary";
import ActiveVsClosedStakes from "views/admin/dataTables/components/ActiveVsClosedStakes";
export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <Flex justify="space-between" align="flex-start" wrap="wrap" mb="20px">
      {/* Kwadraty po lewej */}
      <Box width={{ base: "100%", md: "calc(50% - 10px)", xl: "calc(33.33% - 10px)" }} mb={{ base: "20px", md: 0 }}>
        <TotalEarningsSummary />
      </Box>
      <Box width={{ base: "100%", md: "calc(50% - 10px)", xl: "calc(33.33% - 10px)" }} mb={{ base: "20px", md: 0 }}>
        <AverageAPYChart />
      </Box>
      <Box width={{ base: "100%", md: "calc(50% - 10px)", xl: "calc(33.33% - 10px)" }} mb={{ base: "20px", md: 0 }}>
        <ActiveVsClosedStakes />
      </Box>
      {/* Kwadraty po prawej */}
      <Box width={{ base: "200%", md: "50%", xl: "60.66%" }}>
        <Activestakes />
      </Box>
      <Box width={{ base: "100%", md: "50%", xl: "33.33%" }}>
        <PastStakes />
      </Box>
    </Flex>
  </Box>
);
}