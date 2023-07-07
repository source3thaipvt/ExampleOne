import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import HeaderApp from '../../component/HeaderApp'
import images from '../../../res/images'
import {AuthContext} from '../../context/AuthContext'

const HomeScreen = (props: any) => {
    const {login, logout, setIsLoading, userToken} = useContext(AuthContext)
    useEffect(()=>{
        console.log("userToken", userToken)
        setIsLoading(true)
    })
    return (
        <View>
            
            <HeaderApp navigation={props.navigation} title='Trang chủ' iconLeft={images.ic_back_black}/>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})