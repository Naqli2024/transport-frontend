import React, { useState } from "react";
import {
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import TransportMain from "../pages/Dashboard/TransportMain.js";
import ControlTower from "../pages/command/ControlTower.js";
import LiveTracking from "../pages/command/LiveTracking.js";
import Header from "../components/Header/Header.js";
import FleetContracts from "../pages/operations/FleetContracts/FleetContracts.js";
import AllTrips from "../pages/operations/AllTrips/AllTrips.js";
import ProofOfDelivery from "../pages/operations/ProofOfDelivery/ProofOfDelivery.js";
import ReturnLoads from "../pages/operations/ReturnLoads/ReturnLoads.js";
import PreTrip from "../pages/operations/PreTrip/PreTrip.js";
import PostTrip from "../pages/operations/PostTrip/PostTrip.js";
import Breakdown from "../pages/operations/Breakdown&Recovery/Breakdown.js";
import DriverSettlement from "../pages/operations/DriverSettlement/DriverSettlement.js";
import AgentsCommission from "../pages/operations/Agents&Commission/AgentsCommission.js";
import VendorFleet from "../pages/operations/VendorFleet/VendorFleet.js";
import EquipmentBillingPage from "../pages/billing/EquipmentBilling/EquipmentBillingPage.js";
import PaymentsPage from "../pages/billing/PaymentCollection/PaymentsPage.js";
import VehicleMaster from "../pages/Fleet/VehicleMaster/VehicleMaster.js";
import HeavyEquipment from "../pages/Fleet/HeavyEquipment/HeavyEquipment.js";
import BusOperation from "../pages/Fleet/BusOperations/BusOperations.js";
import TyreIntel from "../pages/Fleet/TyreIntelligence/TyreIntelligence.js";
import TyreIntelligence from "../pages/Fleet/TyreIntelligence/TyreIntelligence.js";
import BusOperations from "../pages/Fleet/BusOperations/BusOperations.js";
import Drivers from "../pages/Fleet/Drivers/Drivers.js";
import FuelControl from "../pages/Fleet/FuelControl/FuelControl.js";
import PreventiveMaintenance from "../pages/Maintenance/PreventMaintenance/PreventiveMaintenance.js";
import Workshop from "../pages/Maintenance/WorkShop/Workshop.js";
import SpareParts from "../pages/Maintenance/SpareParts/SpareParts.js";
import SignIn from "../pages/Auth/SignIn.js";
import Color from "../services/Color.js";
import Finance from "../pages/Finance/Finance.js";
import TeamAccess from "../pages/Settings/TeamAccess.js";
import AiPrediction from "../pages/Intelligence/AiPrediction/AiPrediction.js";
import Profitability from "../pages/Intelligence/Profitability/Profitability.js";
import Settings from "../pages/Settings/Settings.js";
import Vendors from "../pages/Vendor/Vendors.js";
import Brokers from "../pages/Fleet/Brokers/Brokers.js";
import Customers from "../pages/Fleet/Customers/Customers.js";
import PublicRoutes from "./PublicRoutes.js";
import ProtectedRoutes from "./ProtectedRoutes.js";

const AppRoutes = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/"];

  const hideHeader = hideHeaderRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname),
  );

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        {/* =====================================================
            PUBLIC LOGIN
            Browser URL:
            /transport/
            ===================================================== */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              <SignIn />
            </PublicRoutes>
          }
        />

        {/* =====================================================
            PROTECTED TRANSPORT ERP
            Browser URL:
            /transport/dashboard
            /transport/drivers
            /transport/vendors
            etc.

            Because basename="/transport", React route
            "/dashboard" becomes browser URL:
            "/transport/dashboard"
            ===================================================== */}
        <Route
          element={
            <ProtectedRoutes>
              <TransportMain />
            </ProtectedRoutes>
          }
        >
          <Route path="/dashboard" element={<ControlTower />} />

          <Route path="/live-gps-tracking" element={<LiveTracking />} />

          <Route path="/all-trips" element={<AllTrips />} />

          <Route path="/fleet-contracts" element={<FleetContracts />} />

          <Route path="/proof-delivery" element={<ProofOfDelivery />} />

          <Route path="/return-loads" element={<ReturnLoads />} />

          <Route path="/pre-trip" element={<PreTrip />} />

          <Route path="/post-trip" element={<PostTrip />} />

          <Route path="/breakdown-recovery" element={<Breakdown />} />

          <Route path="/driver-settlement" element={<DriverSettlement />} />

          <Route path="/agents-commission" element={<AgentsCommission />} />

          <Route path="/vendor-fleet" element={<VendorFleet />} />

          <Route path="/equipment-billing" element={<EquipmentBillingPage />} />

          <Route path="/payment-collections" element={<PaymentsPage />} />

          <Route path="/vehicle-master" element={<VehicleMaster />} />

          <Route path="/heavy-equipment" element={<HeavyEquipment />} />

          <Route path="/bus-operations" element={<BusOperations />} />

          <Route path="/tyre-intelligence" element={<TyreIntelligence />} />

          <Route path="/drivers" element={<Drivers />} />

          <Route path="/fuel-control" element={<FuelControl />} />

          <Route path="/vendors" element={<Vendors />} />

          <Route path="/pm-settings" element={<PreventiveMaintenance />} />

          <Route path="/workshop" element={<Workshop />} />

          <Route path="/spare-parts" element={<SpareParts />} />

          <Route path="/finance" element={<Finance />} />

          <Route path="/team-access" element={<TeamAccess />} />

          <Route path="/ai-predictions" element={<AiPrediction />} />

          <Route path="/profitability" element={<Profitability />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/brokers" element={<Brokers />} />

          <Route path="/customers" element={<Customers />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
