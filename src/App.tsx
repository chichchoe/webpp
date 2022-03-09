import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';

import useToken from './hook/useToken';
import Login from './page/login/Login';

import RouterPage from './page/routes';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />;
    }
    return <RouterPage />;
}

export default App;
