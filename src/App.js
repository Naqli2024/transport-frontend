import React from 'react'
import "../src/assets/styles/transport.css";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
