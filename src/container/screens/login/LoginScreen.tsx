import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NavigationService from '../base/NavigationService'
import { ScreenName } from '../base/AppContainer'
import TouchButton from '../../../components/TouchButton'
import TextViewBase from '../../../components/TextViewBase'
import { sizes } from '../../../res/sizes'
import InputBase from '../../../components/InputBase'
import { Formik } from 'formik'
import { loginValidateSchema } from '../../../utils/validations'
// import { showToast } from '../../../utils/Utils'

const LoginScreen = (props: any) => {
 const [isHide, setIsHide] = useState(true)
  const onSubmit = (values: any) => {
    console.log(values)
    // showToast('okde', 2000)
    if (values.username.toLowerCase().trim() == 'admin' && values.password.trim() == '123456') {
      NavigationService.navigate(ScreenName.HOMESCREEN)
    }else{
      console.log('Tên đăng nhập hoặc mật khẩu không đúng');
    }

  }

  return (
    <View style={styles.container}>
      <View style={{ height: sizes._screen_height * 0.2 }} />
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={values => onSubmit(values)}
        validationSchema={loginValidateSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <InputBase
              initValue={values.username}
              onChangeText={handleChange('username')}
              isError={true}
              captionError={errors.username}
              placeholder='Tên đăng nhập hoặc số điện thoại'
              onBlur={handleBlur('username')}
              textInputProps={{
                placeholderTextColor: 'gray',
                value: values.username
              }}
              containerStyles={{ paddingBottom: 15, paddingHorizontal: 20, }}
            />
            <InputBase
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
                textTransform:'uppercase',
                fontWeight: '500',
                letterSpacing: 0.2
              }}
              onPressInRight={()=>{setIsHide(false)}}
              onPressOutRight={()=>{setIsHide(true)}}
            />

            <TouchButton
              containerStyles={{ ...styles.btn_login }}
              onPress={handleSubmit}
            >
              <TextViewBase title='Login' textStyles={styles.txt_login} />
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
  txt_login: {
    color: 'white'
  },
})