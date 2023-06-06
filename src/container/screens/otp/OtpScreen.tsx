import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavigationService from '../base/NavigationService'
import { ScreenName } from '../base/AppContainer'
import HeaderApp from '../../component/HeaderApp'

const OtpScreen = (props: any) => {
  return (
    <View>
      <HeaderApp navigation={props.navigation}/>

      <TouchableOpacity
        style={{ backgroundColor: 'red' }}
        onPress={()=>{ NavigationService.pop() }}
      >
        <Text> 123</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OtpScreen

const styles = StyleSheet.create({})