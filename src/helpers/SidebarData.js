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

export const transportItems = [
  {
    group: "Command",
    items: [
      {
        path: "control-tower",
        icon: <RiDashboardLine size={15} />,
        label: "Control Tower",
      },
      {
        path: "live-gps-tracking",
        icon: <RiMapPinLine size={15} />,
        label: "Live GPS Tracking",
      },
    ],
  },
  {
    group: "Operations",
    items: [
      {
        path: "all-trips",
        icon: <RiRouteLine size={15} />,
        label: "All Trips",
      },
      {
        path: "fleet-contracts",
        icon: <RiFileList3Line size={15} />,
        label: "Fleet Contracts",
      },
      {
        path: "proof-delivery",
        icon: <RiFilePaper2Line size={15} />,
        label: "Proof of Delivery",
      },
      {
        path: "return-loads",
        icon: <RiExchangeDollarLine size={15} />,
        label: "Return Loads",
      },
      // {
      //   path: "pre-trip",
      //   icon: <RiShieldCheckLine size={15} />,
      //   label: "Pre-Trip Inspection",
      // },
      // {
      //   path: "post-trip",
      //   icon: <RiShieldCheckLine size={15} />,
      //   label: "Post-Trip Inspection",
      // },
      {
        path: "breakdown-recovery",
        icon: <RiErrorWarningLine size={15} />,
        label: "Breakdown & Recovery",
      },
      {
        path: "driver-settlement",
        icon: <RiWallet3Line size={15} />,
        label: "Driver Settlement",
      },
      {
        path: "agents-commission",
        icon: <RiUserStarLine size={15} />,
        label: "Agents & Commission",
      },
      {
        path: "vendor-fleet",
        icon: <RiTruckLine size={15} />,
        label: "Vendor Fleet",
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
      {
        path: "heavy-equipment",
        icon: <RiTruckLine size={15} />,
        label: "Heavy Equipment",
      },
      {
        path: "bus-operations",
        icon: <RiBusLine size={15} />,
        label: "Bus Operations",
      },
      {
        path: "tyre-intelligence",
        icon: <RiSteering2Line size={15} />,
        label: "Tyre Intelligence",
      },
      {
        path: "drivers",
        icon: <RiUser3Line size={15} />,
        label: "Drivers",
      },
      {
        path: "customers",
        icon: <RiUser3Line size={15} />,
        label: "Customers",
      },
      {
        path: "brokers",
        icon: <RiUser3Line size={15} />,
        label: "Brokers",
      },
      {
        path: "fuel-control",
        icon: <RiGasStationLine size={15} />,
        label: "Fuel Control",
      },
       {
        path: "vendors",
        icon: <RiUser3Line size={15} />,
        label: "Vendors",
      },
    ],
  },
  {
    group: "Vendor",
    items: [
     
      {
        path: "vendor-vehicle",
        icon: <RiTruckLine size={15} />,
        label: "Vehicle",
      }
    ]
  },
  {
    group: "Maintenance",
    items: [
      {
        path: "workshop",
        icon: <RiToolsLine size={15} />,
        label: "Workshop & WOs",
      },
      {
        path: "pm-settings",
        icon: <RiSettings3Line size={15} />,
        label: "PM Settings",
      },
      {
        path: "spare-parts",
        icon: <RiToolsLine size={15} />,
        label: "Spare Parts",
      },
    ],
  },
  {
    group: "Billing",
    items: [
      {
        path: "equipment-billing",
        icon: <RiMoneyDollarCircleLine size={15} />,
        label: "Equipment Billing",
      },
      {
        path: "payment-collections",
        icon: <RiExchangeDollarLine size={15} />,
        label: "Payment & Collections",
      },
    ],
  },
  {
    group: "Compliance",
    items: [
      {
        path: "compliance-legal",
        icon: <RiShieldCheckLine size={15} />,
        label: "Compliance & Legal",
      },
      {
        path: "customer-portal",
        icon: <RiGroupLine size={15} />,
        label: "Customer Portal",
      },
    ],
  },
  {
    group: "Intelligence",
    items: [
      {
        path: "ai-predictions",
        icon: <RiBrainLine size={15} />,
        label: "AI Predictions",
      },
      {
        path: "profitability",
        icon: <RiLineChartLine size={15} />,
        label: "Profitability",
      },
    ],
  },
  {
    group: "Finance",
    items: [
      {
        path: "finance",
        icon: <RiMoneyDollarCircleLine size={15} />,
        label: "Finance",
      },
    ],
  },
  {
    group: "Settings",
    items: [
      {
        path: "team-access",
        icon: <RiLock2Line size={15} />,
        label: "Team Access",
      },
    ],
  },
];