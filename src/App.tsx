import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Manatee from './components/Manatee';
import Narwhal from './components/Narwhal';
function App() {
    return (
        <div className="wrapper">
            <h1>Marine Mammals</h1>

            <Routes>
                <Route path="/" element={<Manatee />} />
                <Route path="about" element={<Narwhal />} />
            </Routes>
        </div>
    );
}

export default App;
