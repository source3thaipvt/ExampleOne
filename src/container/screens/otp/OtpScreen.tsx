import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import NavigationService from '../base/NavigationService'
import { ScreenName } from '../base/AppContainer'
import HeaderApp from '../../component/HeaderApp'
import TextViewBase from '../../../components/TextViewBase'
import { sizes } from '../../../res/sizes'
import TouchButton from '../../../components/TouchButton'
import OTPTextInput from 'react-native-otp-textinput'
import moment from 'moment'
const OtpScreen = (props: any) => {
  const refOtp = useRef()
  const [reTextOTP, setReTextOTP] = useState('2:00')
  useEffect(()=>{
    countDownTime()
    return () =>{
      countDownTime()
    }
  },[])
  const countDownTime = () =>{
    const timeStart = moment().unix()
    let timeCurrent = timeStart
    const timeEnd = timeStart + 120
    
    const setTime = setInterval(()=>{
      if (timeCurrent == timeEnd) {
        clearInterval(setTime)
        setReTextOTP("Gửi lại")
      }else{
        timeCurrent = moment().unix()
        let text = reTextOTP
        const modSecond= (timeEnd - timeCurrent)%60
        const minunes = Math.floor((timeEnd - timeCurrent)/60)
        let second = modSecond < 10 ? `0${modSecond}` : modSecond
        return setReTextOTP(`0${minunes}:${second}`)
      }
    },1000)
  }
  const reSendOTP = () =>{
    countDownTime()
  }
  return (
    <View style={styles.container}>
      <TouchButton icon={true}
        onPress={() => NavigationService.pop()}
        containerStyles={{ justifyContent: 'flex-start', width: 110, left: -20 }}>
        <TextViewBase title='Quay lại' containerStyles={{ marginLeft: 8 }} />
      </TouchButton>
      <View style={{ height: sizes._screen_height * 0.1 }} />
      <TextViewBase title='OTP' containerStyles={{ marginTop: 28 }} textStyles={{ fontSize: 24, fontWeight: '700' }} />
      <TextViewBase title='Nhập mã OTP được gửi về số điện thoại của bạn'
        containerStyles={{ marginVertical: 5, marginBottom: 15 }}
        textStyles={{ color: 'gray', letterSpacing: 0.8 }} />
      <OTPTextInput
        ref={refOtp}
        inputCount={6}
        autoFocus
        handleTextChange={(value: string) => {
          console.log("first", value)
        }}
        textInputStyle={styles.box_otp}
      />

      <View style={{ alignItems: 'center' }}>
        <TouchButton
          containerStyles={{ ...styles.btn_confirm }}
          onPress={() => { }}
        >
          <TextViewBase title='Đăng nhập' textStyles={styles.txt_confirm} />
        </TouchButton>
      </View>
      
      <View style={styles.line_3}>
        <TextViewBase title='Bạn không nhận được mã OTP?' textStyles={{color: 'gray'}}/>
        <TouchButton disabled={reTextOTP != 'Gửi lại'} onPress={reSendOTP} >
          <TextViewBase title={reTextOTP} textStyles={{color: '#47B831'}}/>
        </TouchButton>
      </View>
    </View>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btn_confirm: {
    marginTop: 40,
    backgroundColor: '#47B831',
    borderRadius: 12,
    width: sizes._screen_width * 0.7
  },
  txt_confirm: {
    color: 'white'
  },
  box_otp:{
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 9,
    maxWidth: 50,
    width: sizes._screen_width * 0.115
  },
  line_3:{
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center'
  },
  text_3:{
    color: 'gray'
  }
})