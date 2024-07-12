import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdTimeline,
  MdMonetizationOn,
  MdHistory,
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
    name: 'Staking Pools',
    layout: '/admin',
    path: '/marketplace',
    icon: <MdAccountBalanceWallet size='20px' color='inherit' />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: 'My Staking',
    layout: '/admin',
    icon: <MdTimeline size='20px' color='inherit' />,
    path: '/data-tables',
    component: DataTables,
  },
  {
    name: 'Rewards',
    layout: '/admin',
    path: '/profile',
    icon: <MdMonetizationOn size='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: 'Transactions',
    layout: '/admin',
    path: '/transactions',
    icon: <MdHistory size='20px' color='inherit' />,
    component: transactions,
  },
];

export default routes;
