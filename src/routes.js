import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdTimeline,
  MdMonetizationOn,
  MdHistory,
  MdTrendingUp,
  MdOutlineBarChart,
  MdPerson
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import transactions from "views/admin/transactions";
import Profile1 from "views/admin/profile 1";

// Auth Imports
import SignInCentered from "views/auth/signIn";



const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <MdDashboard size='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: 'Wallet',
    layout: '/admin',
    path: '/marketplace',
    icon: <MdAccountBalanceWallet size='20px' color='inherit' />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: 'Liquidity Mining',
    layout: '/admin',
    icon: <MdOutlineBarChart  size='20px' color='inherit' />,
    path: '/data-tables',
    component: DataTables,
  },
  {
    name: 'Staking',
    layout: '/admin',
    path: '/profile',
    icon: <MdMonetizationOn size='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: 'YieldFarming',
    layout: '/admin',
    path: '/transactions',
    icon: <MdTrendingUp  size='20px' color='inherit' />,
    component: transactions,
  },
];

export default routes;
