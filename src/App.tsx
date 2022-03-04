import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Manatee from './components/Manatee';
import Narwhal from './components/Narwhal';
import Login from './components/Login';
import useToken from './hook/useToken';
import Detail from './components/Detail';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />;
    }
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Manatee />} />
                <Route path="Narwhal" element={<Narwhal />} />
                <Route path="Detail/:id" element={<Detail />} />
            </Route>
        </Routes>
    );
}

export default App;
