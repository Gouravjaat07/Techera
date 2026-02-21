import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Team from './pages/Team';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
