import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import HeaderApp from '../../component/HeaderApp'
import images from '../../../res/images'
import {AuthContext} from '../../context/AuthContext'
import { useAppDispatch } from '../../../redux/hooks'
import TouchButton from '../../../components/TouchButton'
import { setLoading } from '../../../redux/auth/authSlice'

const HomeScreen = (props: any) => {
    const {login, logout, setIsLoading, userToken} = useContext(AuthContext)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        console.log("userToken", userToken)
        // setIsLoading(true)
    },[])
    return (
        <View>
            <HeaderApp navigation={props.navigation} title='Trang chủ' iconLeft={images.ic_back_black}/>
            <Text>HomeScreen</Text>
            <TouchButton 
            title='loading' 
            containerStyles={{backgroundColor:'red'}} 
            onPress={()=>{
                dispatch(setLoading(true))
                setTimeout(()=>{
                    dispatch(setLoading(false))
                }, 2000)
            }}/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})