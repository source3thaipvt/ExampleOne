import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderApp from '../../component/HeaderApp'

const HomeScreen = (props: any) => {
    return (
        <View>
            <HeaderApp navigation={props.navigation} title='Trang chủ' />
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})