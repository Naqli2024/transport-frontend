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
  const publicPaths = ["/"];

  const hideHeaderRoutes = ["/"];
  const hideHeader = hideHeaderRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname),
  );

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes>
              <SignIn />
            </PublicRoutes>
          }
        />
        <Route path="/transport" element={<TransportMain />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes>
                <ControlTower />
              </ProtectedRoutes>
            }
          />

          <Route
            path="live-gps-tracking"
            element={
              <ProtectedRoutes>
                <LiveTracking />
              </ProtectedRoutes>
            }
          />

          <Route
            path="all-trips"
            element={
              <ProtectedRoutes>
                <AllTrips />
              </ProtectedRoutes>
            }
          />

          <Route
            path="fleet-contracts"
            element={
              <ProtectedRoutes>
                <FleetContracts />
              </ProtectedRoutes>
            }
          />

          <Route
            path="proof-delivery"
            element={
              <ProtectedRoutes>
                <ProofOfDelivery />
              </ProtectedRoutes>
            }
          />

          <Route
            path="return-loads"
            element={
              <ProtectedRoutes>
                <ReturnLoads />
              </ProtectedRoutes>
            }
          />

          <Route
            path="pre-trip"
            element={
              <ProtectedRoutes>
                <PreTrip />
              </ProtectedRoutes>
            }
          />

          <Route
            path="post-trip"
            element={
              <ProtectedRoutes>
                <PostTrip />
              </ProtectedRoutes>
            }
          />

          <Route
            path="breakdown-recovery"
            element={
              <ProtectedRoutes>
                <Breakdown />
              </ProtectedRoutes>
            }
          />

          <Route
            path="driver-settlement"
            element={
              <ProtectedRoutes>
                <DriverSettlement />
              </ProtectedRoutes>
            }
          />

          <Route
            path="agents-commission"
            element={
              <ProtectedRoutes>
                <AgentsCommission />
              </ProtectedRoutes>
            }
          />

          <Route
            path="vendor-fleet"
            element={
              <ProtectedRoutes>
                <VendorFleet />
              </ProtectedRoutes>
            }
          />

          <Route
            path="equipment-billing"
            element={
              <ProtectedRoutes>
                <EquipmentBillingPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="payment-collections"
            element={
              <ProtectedRoutes>
                <PaymentsPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="vehicle-master"
            element={
              <ProtectedRoutes>
                <VehicleMaster />
              </ProtectedRoutes>
            }
          />

          <Route
            path="heavy-equipment"
            element={
              <ProtectedRoutes>
                <HeavyEquipment />
              </ProtectedRoutes>
            }
          />

          <Route
            path="bus-operations"
            element={
              <ProtectedRoutes>
                <BusOperations />
              </ProtectedRoutes>
            }
          />

          <Route
            path="tyre-intelligence"
            element={
              <ProtectedRoutes>
                <TyreIntelligence />
              </ProtectedRoutes>
            }
          />

          <Route
            path="drivers"
            element={
              <ProtectedRoutes>
                <Drivers />
              </ProtectedRoutes>
            }
          />

          <Route
            path="fuel-control"
            element={
              <ProtectedRoutes>
                <FuelControl />
              </ProtectedRoutes>
            }
          />

          <Route
            path="vendors"
            element={
              <ProtectedRoutes>
                <Vendors />
              </ProtectedRoutes>
            }
          />

          <Route
            path="pm-settings"
            element={
              <ProtectedRoutes>
                <PreventiveMaintenance />
              </ProtectedRoutes>
            }
          />

          <Route
            path="workshop"
            element={
              <ProtectedRoutes>
                <Workshop />
              </ProtectedRoutes>
            }
          />

          <Route
            path="spare-parts"
            element={
              <ProtectedRoutes>
                <SpareParts />
              </ProtectedRoutes>
            }
          />

          <Route
            path="finance"
            element={
              <ProtectedRoutes>
                <Finance />
              </ProtectedRoutes>
            }
          />

          <Route
            path="team-access"
            element={
              <ProtectedRoutes>
                <TeamAccess />
              </ProtectedRoutes>
            }
          />

          <Route
            path="ai-predictions"
            element={
              <ProtectedRoutes>
                <AiPrediction />
              </ProtectedRoutes>
            }
          />

          <Route
            path="profitability"
            element={
              <ProtectedRoutes>
                <Profitability />
              </ProtectedRoutes>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />

          <Route
            path="brokers"
            element={
              <ProtectedRoutes>
                <Brokers />
              </ProtectedRoutes>
            }
          />

          <Route
            path="customers"
            element={
              <ProtectedRoutes>
                <Customers />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
