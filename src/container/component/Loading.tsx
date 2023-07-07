import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { AuthContext } from '../context/AuthContext'

const Loading = (props:{style?:ViewStyle}) => {
    const loading = useAppSelector((state)=>state.auth.loading)
   const {isLoading} = useContext(AuthContext)
    return (
        <View style={isLoading || loading ? {...styles.viewLoading,...props.style} : {display: 'none'} }>
            <ActivityIndicator color="red" size={'large'} style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    viewLoading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.3)"
    }
})