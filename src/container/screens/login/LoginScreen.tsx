import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavigationService from '../base/NavigationService'
import { ScreenName } from '../base/AppContainer'

const LoginScreen = (props:any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ backgroundColor: 'red' }}
        onPress={()=>{ NavigationService.navigate(ScreenName.HOMESCREEN) }}
      >
        <Text> 123</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})