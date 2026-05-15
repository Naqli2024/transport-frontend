import React, { useState } from 'react'
import { matchPath, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import TransportMain from '../pages/Dashboard/TransportMain'
import ControlTower from '../pages/command/ControlTower'
import LiveTracking from '../pages/command/LiveTracking'
import Header from '../components/Header/Header'
import Demo from '../pages/Dashboard/Demo'
import Demo1 from '../pages/Dashboard/Demo1'
import FleetContracts from '../pages/operations/FleetContracts/FleetContracts'
import AllTrips from '../pages/operations/AllTrips/AllTrips'
import ProofOfDelivery from '../pages/operations/ProofOfDelivery/ProofOfDelivery'
import ReturnLoads from '../pages/operations/ReturnLoads/ReturnLoads'
import PreTrip from '../pages/operations/PreTrip/PreTrip'
import PostTrip from '../pages/operations/PostTrip/PostTrip'
import Breakdown from '../pages/operations/Breakdown&Recovery/Breakdown'
import DriverSettlement from '../pages/operations/DriverSettlement/DriverSettlement'
import AgentsCommission from '../pages/operations/Agents&Commission/AgentsCommission'
import VendorFleet from '../pages/operations/VendorFleet/VendorFleet'
import EquipmentBillingPage from '../pages/billing/EquipmentBilling/EquipmentBillingPage'
import PaymentsPage from '../pages/billing/PaymentCollection/PaymentsPage'
import VehicleMaster from '../pages/Fleet/VehicleMaster/VehicleMaster'
import HeavyEquipment from '../pages/Fleet/HeavyEquipment/HeavyEquipment'
import BusOperation from '../pages/Fleet/BusOperations/BusOperations'
import TyreIntel from '../pages/Fleet/TyreIntelligence/TyreIntelligence'
import TyreIntelligence from '../pages/Fleet/TyreIntelligence/TyreIntelligence'
import BusOperations from '../pages/Fleet/BusOperations/BusOperations'
import Drivers from '../pages/Fleet/Drivers/Drivers'
import FuelControl from '../pages/Fleet/FuelControl/FuelControl'
import PreventiveMaintenance from '../pages/Maintenance/PreventMaintenance/PreventiveMaintenance'
import Workshop from '../pages/Maintenance/WorkShop/Workshop'
import SpareParts from '../pages/Maintenance/SpareParts/SpareParts'
import SignIn from '../pages/Auth/SignIn'
import AI from '../pages/Dashboard/AI.js'

const AppRoutes = () => {
  const location = useLocation();
  const publicPaths = [
    "/",
  ];

  const hideHeaderRoutes = ["/"];
  const hideHeader = hideHeaderRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  return (
    <>
    {!hideHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
              <SignIn />
          }
        />
        <Route path="demo" element={<Demo />} />
        <Route path="demo1" element={<Demo1 />} />
        <Route path="ai" element={<AI />} />
        <Route path='/transport' element={<TransportMain />}>
          <Route path="control-tower" element={<ControlTower />} />
          <Route path="live-gps-tracking" element={<LiveTracking />} />
          <Route path="all-trips" element={<AllTrips />} />
          <Route path="fleet-contracts" element={<FleetContracts />} />
          <Route path="proof-delivery" element={<ProofOfDelivery />} />
          <Route path="return-loads" element={<ReturnLoads />} />
          <Route path="pre-trip" element={<PreTrip />} />
          <Route path="post-trip" element={<PostTrip />} />
          <Route path="breakdown-recovery" element={<Breakdown />} />
          <Route path="driver-settlement" element={<DriverSettlement />} />
          <Route path="agents-commission" element={<AgentsCommission />} />
          <Route path="vendor-fleet" element={<VendorFleet />} />
          <Route path='equipment-billing' element={<EquipmentBillingPage/>}/>
          <Route path='payment-collections' element={<PaymentsPage/>}/>
          <Route path="vehicle-master" element={<VehicleMaster />} />
          <Route path="heavy-equipment" element={<HeavyEquipment />} />
          <Route path="bus-operations" element={<BusOperations />} />
          <Route path="tyre-intelligence" element={<TyreIntelligence />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="fuel-control" element={<FuelControl />} /> 
          <Route path="pm-settings" element={<PreventiveMaintenance/>}/>
          <Route path="workshop" element={<Workshop/>}/>
          <Route path="spare-parts" element={<SpareParts/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
