import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import NavigationService from '../base/NavigationService'
import { ScreenName } from '../base/AppContainer'
import TouchButton from '../../../components/TouchButton'
import TextViewBase from '../../../components/TextViewBase'
import { sizes } from '../../../res/sizes'
import InputBase from '../../../components/InputBase'
import { Formik } from 'formik'
import { loginPhoneValidateSchema, loginValidateSchema } from '../../../utils/Validations'
// import { showToast } from '../../../utils/Utils'
import auth from '@react-native-firebase/auth';
import api from '../../../api/api'
import { AuthContext } from '../../context/AuthContext'
import { useAppDispatch } from '../../../redux/hooks'
import { setLoading } from '../../../redux/auth/authSlice'

const LoginScreen = (props: any) => {
  const [isHide, setIsHide] = useState(true)
  const [isSwitchLogin, setSwitchLogin] = useState(true)
  const {login, logout, setIsLoading} = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const initValues = {
    username: '',
    password: ''
  }
  const onSubmit = async (values: { username: string, password: string }, resetForm: any, setErrors: any) => {
    Keyboard.dismiss()
    console.log(values)
    // dispatch(setLoading(true))
    // setTimeout(()=>{
    //   dispatch(setLoading(false))
    // },2000)
    login(values.username, values.password)
    // setLoading(true)
    return  
    if (isSwitchLogin) {
      if (values.username.toLowerCase() != 'admin' && values.password.toLocaleLowerCase() != '123456') {
        console.log('eeeeee');
        setErrors( {username: '', password: 'Tên đăng nhập hoặc mật khẩu không đúng'})
        return
      }
      const res = await api.postLogin('kminchelle','0lelplRs')
      console.log("res, res", res)
      
      return
    }
    auth()
      .signInWithEmailAndPassword(values.username.toLocaleLowerCase(), values.password)
      .then(() => {
        console.log('User account created & signed in!');
        NavigationService.navigate(ScreenName.HOMESCREEN)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          console.log('Tên đăng nhập hoặc mật khẩu không đúng');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          console.log('Tên đăng nhập hoặc mật khẩu không đúng');
        }

        console.error(error);
      });
  }
  return (
    <View style={styles.container}>
      <View style={{ height: sizes._screen_height * 0.2 }} />
      <Formik
        initialValues={initValues}
        onReset={ values =>{
          console.log(values);
          
        }}
        onSubmit={(values, {resetForm, setErrors}) => onSubmit(values,resetForm, setErrors)}
        validationSchema={isSwitchLogin ? loginValidateSchema : loginPhoneValidateSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, resetForm, setErrors, setValues, setTouched }) => (
          <>
            <InputBase
              initValue={values.username}
              onChangeText={handleChange('username')}
              isError={true}
              captionError={errors.username}
              placeholder={isSwitchLogin ? 'Tên đăng nhập' : 'Số điện thoại'}
              onBlur={handleBlur('username')}
              textInputProps={{
                placeholderTextColor: 'gray',
                value: values.username,
                keyboardType: isSwitchLogin ? 'default' : 'phone-pad'
              }}
              containerStyles={{ paddingBottom: 15, paddingHorizontal: 20, }}
            />
            {isSwitchLogin && <InputBase
              initValue={values.password}
              onChangeText={handleChange('password')}
              isError={true}
              captionError={errors.password}
              placeholder='Mật khẩu'
              onBlur={handleBlur('password')}
              textInputProps={{
                placeholderTextColor: 'gray',
                secureTextEntry: isHide,
                value: values.password
              }}
              containerStyles={{ paddingBottom: 10, paddingHorizontal: 20 }}
              textRight='Hide'
              textRightStyles={{
                textTransform: 'uppercase',
                fontWeight: '500',
                letterSpacing: 0.2
              }}
              onPressInRight={() => { setIsHide(false) }}
              onPressOutRight={() => { setIsHide(true) }}
            />}

            <TouchButton
              containerStyles={{ ...styles.btn_login }}
              onPress={handleSubmit}
            >
              <TextViewBase title='Login' textStyles={styles.txt_login} />
            </TouchButton>
            <TouchButton
              containerStyles={{ ...styles.btn_switch }}
              onPress={()=>{
                resetForm({values: initValues})
                setSwitchLogin(!isSwitchLogin)
              }}
            >
              <TextViewBase title={isSwitchLogin ? 'Sign with phone' : 'Sign with account'} textStyles={styles.txt_login} />
            </TouchButton>
          </>)}
      </Formik>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btn_login: {
    marginTop: 40,
    backgroundColor: '#47B831',
    borderRadius: 12,
    width: sizes._screen_width * 0.7
  },
  btn_switch: {
    marginTop: 40,
    backgroundColor: '#47B831',
    borderRadius: 12,
    width: 'auto'
  },
  txt_login: {
    color: 'white'
  },
})