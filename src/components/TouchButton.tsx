import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React from 'react'
import images from '../res/images'
import TextViewBase from './TextViewBase'

interface Props extends TouchableOpacityProps {
  containerStyles?: ViewStyle,
  title?: string
  icon?: any
}

const TouchButton = (props: Props) => {
  return (
    <TouchableOpacity
    style={{
      padding: 10,
      paddingHorizontal: 18,
      justifyContent: 'center',
      alignItems:'center',
      ...props.containerStyles
    }}
    {...props}
    >
      {props.title ? <TextViewBase>{props?.title ?? 'Defaut Button'}</TextViewBase> :
        props.icon && <Image source={props.icon ?? images.ic_back_black} style={{ height: 14, width: 14 }} resizeMode='contain' />}
      {props.children}
    </TouchableOpacity>
  )
}

export default TouchButton

const styles = StyleSheet.create({})