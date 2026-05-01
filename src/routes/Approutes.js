import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import TransportMain from '../pages/Dashboard/TransportMain'
import ControlTower from '../pages/command/ControlTower'
import LiveTracking from '../pages/command/LiveTracking'
import AllTrips from '../pages/operations/AllTrips'
import PreTripInspection from '../pages/operations/PreTripInspection'
import PostTripInspection from '../pages/operations/PostTripInspection'





const Approutes = () => {
 
  return (
    <>
      <Routes>
       <Route path='/' element={<TransportMain/>}>
       <Route path="control-tower" element={<ControlTower/>}/>
       <Route path="live-gps-tracking" element={<LiveTracking/>}/>
       <Route path="all-trips" element={<AllTrips/>}/>
       <Route path='pre-trip-inspection' element={<PreTripInspection/>}/>
       <Route path='post-trip-inspection' element={<PostTripInspection/>}/>
       </Route>

     

      </Routes>
    </>
  )
}

export default Approutes
