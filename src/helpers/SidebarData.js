import {
  RiDashboardLine,
  RiMapPinLine,
  RiRouteLine,
  RiShieldCheckLine,
  RiErrorWarningLine,
  RiWallet3Line,
  RiUserStarLine,
  RiTruckLine,
  RiCarLine,
  RiBusLine,
  RiSteering2Line,
  RiUser3Line,
  RiGasStationLine,
  RiToolsLine,
  RiSettings3Line,
  RiBrainLine,
  RiLineChartLine,
  RiMoneyDollarCircleLine,
  RiFileList3Line,
  RiFilePaper2Line,
  RiExchangeDollarLine,
  RiGroupLine,
  RiLock2Line,
} from "react-icons/ri";
import { PiSteeringWheel } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { GiProfit } from "react-icons/gi";


export const transportItems = [
  {
    group: "Overview",
    items: [
      {
        path: "dashboard",
        icon: <RiDashboardLine size={15} />,
        label: "Dashboard",
      },
      {
        path: "live-gps-tracking",
        icon: <RiMapPinLine size={15} />,
        label: "Live GPS Tracking",
      },
      {
        path: "all-trips",
        icon: <RiRouteLine size={15} />,
        label: "Trips",
      },
    ],
  },
  {
    group: "Roles",
    items: [
      {
        path: "drivers",
        icon: <PiSteeringWheel size={15} />,
        label: "Drivers",
      },
      {
        path: "customers",
        icon: <GrGroup size={15} />,
        label: "Customers",
      },
      {
        path: "brokers",
        icon: <RiUser3Line size={15} />,
        label: "Brokers",
      },
    ],
  },
  {
    group: "Fleet",
    items: [
      {
        path: "vehicle-master",
        icon: <RiCarLine size={15} />,
        label: "Vehicle Master",
      },
      // {
      //   path: "heavy-equipment",
      //   icon: <RiTruckLine size={15} />,
      //   label: "Heavy Equipment",
      // },
      // {
      //   path: "bus-operations",
      //   icon: <RiBusLine size={15} />,
      //   label: "Bus Operations",
      // },
      {
        path: "vendors",
        icon: <RiUser3Line size={15} />,
        label: "Vendors",
      },
    ],
  },
  {
    group: "Ledger",
    items: [
      {
        path: "driver-settlement",
        icon: <RiWallet3Line size={15} />,
        label: "Driver Settlement",
      },
      {
        path: "p&l",
        icon: <GiProfit size={15} />,
        label: "P & L",
      },
    ],
  },
];