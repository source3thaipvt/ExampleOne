import { StyleSheet, Text, TextProps, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import fonts from '../res/fonts'

interface Props {
    children?: ReactNode
    containerStyles?: ViewStyle,
    textStyles?: TextStyle,
    title?: string,
    textProps?: TextProps,
}

const TextViewBase = (props: Props) => {
    return (
        <View style={{ ...props.containerStyles }}>
            <Text
                style={{ ...styles.text, ...props.textStyles }}
                {...props.textProps}
            >
                {props?.title}
                {props.children}
            </Text>
        </View>
    )
}

export default TextViewBase

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        letterSpacing: 1.8,
        fontFamily: fonts.RobotoSlabRegular,
    }
})