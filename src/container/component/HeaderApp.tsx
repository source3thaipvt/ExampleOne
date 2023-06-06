import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { sizes } from '../../res/sizes';
import TouchButton from '../../components/TouchButton';
import images from '../../res/images';
import TextViewBase from '../../components/TextViewBase';

export interface THeaderProps {
    navigation: any,
    stylesContainer?: ViewStyle,
    stylesTitle?: ViewStyle,
    iconLeft?: any,
    iconRight?: any,
    title?: string,
    onPressLeft?: void,
    onPressRight?: void,

}

const HeaderApp = (props: THeaderProps) => {
    console.log('navigation', props.navigation);
    return (
        <View style={{ ...styles.container, ...props?.stylesContainer }}>
            {props.iconLeft && <TouchButton icon={props.iconLeft ?? images.ic_back_black} containerStyles={{ ...styles.iconLeft }} />}
            {props.title && <View style={{ ...styles.viewTitle, ...props.stylesTitle }}>
                <TextViewBase title='Header App' textStyles={{ ...styles.textTitle }} />
            </View>}
            {props.iconRight && <TouchButton icon={props.iconRight ?? images.ic_back_black} containerStyles={{ ...styles.iconRight }} />}
        </View>
    )
}

export default HeaderApp

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 42,
        width: sizes._screen_width,
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,
        elevation: 1
    },
    iconLeft: {
        backgroundColor: 'red',
        width: 50,
        position: 'absolute',
        left: 0
    },
    iconRight: {
        backgroundColor: 'red',
        width: 50,
        position: 'absolute',
        right: 0
    },
    viewTitle: {
        flex: 1,
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: '600'
    }
})