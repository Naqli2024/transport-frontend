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
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
