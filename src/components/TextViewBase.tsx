import { StyleSheet, Text, TextProps, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'

interface Props extends TextProps {
    containerStyles?: ViewStyle,
    textStyles?: TextStyle,
    title?: string
}

const TextViewBase = (props: Props) => {
    return (
        <View style={{ ...props.containerStyles }}>
            <Text
                style={{ ...styles.text, ...props.textStyles }}
                {...props}
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
        letterSpacing: 1.8
    }
})