import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderApp from '../../component/HeaderApp'
import images from '../../../res/images'

const HomeScreen = (props: any) => {
    return (
        <View>
            <HeaderApp navigation={props.navigation} title='Trang chủ' iconLeft={images.ic_back_black}/>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})