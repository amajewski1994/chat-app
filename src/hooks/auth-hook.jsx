import { useState, useCallback, useEffect } from 'react';
import { io } from "socket.io-client"
import { socket } from '../shared/socket'

let logoutTimer;

const BASE_URL = "http://localhost:5000"

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [avatar, setAvatar] = useState(false);

    const login = useCallback((uid, token, avatar, expirationDate) => {
        setToken(token);
        setUserId(uid);
        setAvatar(avatar)
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                avatar: avatar,
                expiration: tokenExpirationDate.toISOString()
            })
        );
        const createdSocket = io(BASE_URL)
        if (socket.data && socket.data.connected) return
        createdSocket.connect()
        socket.data = createdSocket
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        setAvatar(null);
        localStorage.removeItem('userData');
        if (!socket.data || !socket.data.connected) return
        socket.data.disconnect()
        socket.data = null
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.userId, storedData.token, storedData.avatar, new Date(storedData.expiration));
        }
    }, [login]);

    return { token, login, logout, userId, avatar };
};