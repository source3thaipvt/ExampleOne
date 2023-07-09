import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import api from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../screens/base/NavigationService';
import { ScreenName } from '../screens/base/AppContainer';

export interface TAuthContext {
    login: (username: string, password: string) => void,
    logout: () => void,
    userToken: string | null,
    user: Object | null,
    isLoading: boolean,
    setIsLoading: (visible: boolean) => void
    erorMsg: string,
}

export const AuthContext = createContext<TAuthContext>({
    login: (username: string, password: string) => { },
    logout: () => { },
    userToken: null,
    user: null,
    isLoading: false,
    setIsLoading: () => { },
    erorMsg: '',
});

const AuthProvider = ({ children }: any) => {
    const [isLoading, setLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [user, setUser] = useState(null)
    const [erorMsg, setErorMsg] = useState('')
    const login = async (username: string, password: string) => {
        setLoading(true)
        setErorMsg('')
        const timerOut = setTimeout(() => {
            setLoading(false)
        }, 5000);
        try {
            // const res = await api.postLogin('kminchelle', '0lelplR')
            const res = await api.postLogin(username, password)
            if (res && res.status == 200) {
                setUserToken(res.data.token)
                setUser(res.data)
                AsyncStorage.setItem('USER_TOKEN', res.data.token)
                setLoading(false)
                clearTimeout(timerOut)
                NavigationService.navigate(ScreenName.HOMESCREEN)
            } else {
                setLoading(false)
                clearTimeout(timerOut)
                console.log('Login error',);
                setErorMsg('Tên đăng nhập hoặc mật khẩu không đúng')
            }
        } catch (error) {
            setLoading(false)
            clearTimeout(timerOut)
        }


    }
    const logout = () => {
        setUserToken(null)
        setUser(null)
        AsyncStorage.removeItem('USER_TOKEN')
        setLoading(false)
        console.log('logout',);
    }
    const setIsLoading = (visible: boolean) => {
        setLoading(visible)
    }
    const isLoggedIn = async () => {
        try {
            let token = await AsyncStorage.getItem('USER_TOKEN')
            if (user) {
                setUserToken(token)
            }
            setLoading(false)
        } catch (error) {
            console.log('isLogged in error ', error)
        }
    }
    useEffect(()=>{
        isLoggedIn()
    },[])
    return (
        <AuthContext.Provider value={{ login, logout, userToken, user, isLoading, setIsLoading, erorMsg }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider