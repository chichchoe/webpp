import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString: any = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };
    const [token, setToken] = useState(getToken());
    const saveToken = (userToken: { username: string; password: string }) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token,
    };
}
