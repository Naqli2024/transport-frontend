import React from 'react'
import "../src/assets/styles/transport.css";
import { BrowserRouter } from 'react-router-dom';
import Approutes from './routes/Approutes';


function App() {
  return (
    <div>
     <BrowserRouter>
     <Approutes/>
     </BrowserRouter> 
    </div>
  )
}

export default App
