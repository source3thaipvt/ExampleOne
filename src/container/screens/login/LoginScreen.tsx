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
import { AuthContext } from '../../context/AuthContext'
import { useAppDispatch } from '../../../redux/hooks'
import { setLoading } from '../../../redux/auth/authSlice'

const LoginScreen = (props: any) => {
  const [isHide, setIsHide] = useState(true)
  const [isSwitchLogin, setSwitchLogin] = useState(true)
  const [confirm, setConfirm] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const { login, logout, setIsLoading, erorMsg } = useContext(AuthContext)

  const dispatch = useAppDispatch()
  const initValues = {
    username: '',
    password: ''
  }
  function onAuthStateChanged(user: any) {
    if (user) {
      console.log("user,dddd", user);

    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onSubmit = async (values: { username: string, password: string }, resetForm: any, setErrors: any) => {
    Keyboard.dismiss()
    if (isSwitchLogin) {
      await login(values.username, values.password)
      // const res = await api.postLogin('kminchelle', '0lelplR')
      if (erorMsg.length > 0) {
        setErrors({ username: '', password: erorMsg })
      }
    } else {
      console.log(values.username.slice(1));
      const aer = auth().verifyPhoneNumber(`+84${values.username.slice(1)}`)
      console.log(aer)
      return
      const confirmation = await auth().signInWithPhoneNumber(`+84${values.username.slice(1)}`).then((e) => {
        console.log("eeeeeeee", e);

      })
        .catch(err => {
          console.log("errerr", err);

        })
      setConfirm(confirmation)
      NavigationService.navigate(ScreenName.OTPSCREEN, {
        confirmation
      })
      console.log("confirmation", confirmation);

    }

  }
  return (
    <View style={styles.container}>
      <View style={{ height: sizes._screen_height * 0.12 }} />
      <TextViewBase title='Đăng nhập' containerStyles={{ marginVertical: 28 }} textStyles={{ fontSize: 24, fontWeight: '700' }} />
      <Formik
        initialValues={initValues}
        onReset={values => {
          console.log(values);

        }}
        onSubmit={(values, { resetForm, setErrors }) => onSubmit(values, resetForm, setErrors)}
        validationSchema={isSwitchLogin ? loginValidateSchema : loginPhoneValidateSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, resetForm, setErrors, setValues, setTouched }) => (
          <View style={{ alignItems: 'center' }}>
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
              containerStyles={{ paddingBottom: 15 }}
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
              containerStyles={{ paddingBottom: 10 }}
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
              <TextViewBase title='Đăng nhập' textStyles={styles.txt_login} />
            </TouchButton>
            <TouchButton
              containerStyles={{ ...styles.btn_switch }}
              onPress={async () => {
                resetForm({ values: initValues })
                setSwitchLogin(!isSwitchLogin)
                confirm.confirm('111111').then((user) => {
                  console.log('dsadsdsaddddd', user);

                })
              }}
            >
              <TextViewBase title={isSwitchLogin ? 'Đăng nhập với số điện thoại' : 'Đăng nhập với tài khoản'} textStyles={styles.txt_login} />
            </TouchButton>
          </View>)}
      </Formik>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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