import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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

const AppRoutes = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/transport/control-tower" />} />
        <Route path="demo" element={<Demo />} />
        <Route path="demo1" element={<Demo1 />} />
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
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
