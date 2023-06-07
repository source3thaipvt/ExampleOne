import { Text, StyleSheet, View, TextInputProps, TextInput, ViewStyle, Image, TextStyle } from 'react-native'
import React, { Component } from 'react'
import TextViewBase from './TextViewBase'
import images from '../res/images';
import TouchButton from './TouchButton';
interface Props {
    initValue?: string,
    placeholder?: string,
    captionError?: string,
    isError?: boolean,
    onChangeText: (text: string) => void,
    containerStyles?: ViewStyle
    boxStyles?: ViewStyle,
    textInputProps?: TextInputProps,
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
    iconLeft?: string;
    iconRight?: string;
    onPressLeft?: () => void;
    onPressRight?: () => void;
    onPressInRight?: () => void;
    onPressOutRight?: () => void;
    textRight?: string;
    textRightStyles?: TextStyle;
}
interface State {
    value: string,
    focus: boolean,
    blur: boolean,
    error: boolean,
    disable: boolean,
}
export default class InputBase extends Component<Props, State> {
    state: Readonly<State> = {
        value: '',
        focus: false,
        blur: true,
        error: false,
        disable: false,
    }
    componentDidMount(): void {
        this.setState({
            value: this.props.initValue ?? '',
            error: this.props.isError || false,
        })
    }
    _onChangeText(text: string) {

        this.setState({
            value: text
        }, () => {
            this.props.onChangeText(text)
        })
    }
    _onBlur = (e: any) => {
        if (this.props.onBlur) {
            this.props.onBlur(e)
        }
        this.setState({
            blur: true,
            focus: false,
        })
    }
    _onFocus = (e: any) => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
        this.setState({
            blur: false,
            focus: true,
        })
    }
    render() {
        const { isError, initValue, placeholder, captionError, containerStyles, boxStyles, iconLeft, iconRight, onPressLeft, onPressRight, textRight, textRightStyles, onPressOutRight, onPressInRight } = this.props
        const { value, focus, error, disable } = this.state

        return (
            <View style={{ ...containerStyles, backgroundColor: 'transparent' }}>
                <View style={{
                    ...styles.box_input, ...boxStyles,
                    borderColor: this.state.focus ? 'blue' : 'gray'
                }}>
                    {iconLeft &&
                        <TouchButton
                            containerStyles={{ paddingHorizontal: 10, left: -8 }}
                            onPress={onPressLeft}
                        >
                            <Image
                                resizeMode='contain'
                                source={iconLeft || images.ic_back_black}
                                style={{
                                    height: 12,
                                    width: 12
                                }}
                            />
                        </TouchButton>
                    }
                    <TextInput
                        style={{
                            ...styles.input,
                            fontSize: focus ? 16 : 14, color: focus ? 'red' : 'black'
                        }}
                        value={value}
                        onChangeText={(value) => this._onChangeText(value)}
                        placeholder={placeholder}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                        {...this.props.textInputProps}
                    />

                    {iconRight || textRight &&
                        <TouchButton
                            containerStyles={{ paddingHorizontal: 10, right: -8 }}
                            onPress={onPressRight}
                            onPressIn={onPressInRight}
                            onPressOut={onPressOutRight}
                        >
                            {iconRight && <Image
                                resizeMode='contain'
                                source={iconRight || images.ic_back_black}
                                style={{
                                    height: 12,
                                    width: 12
                                }}
                            />}
                            {textRight && <TextViewBase textStyles={textRightStyles}>{textRight}</TextViewBase>}
                        </TouchButton>
                    }
                </View>
                {isError && captionError && <TextViewBase textStyles={styles.txt_error}>{captionError}</TextViewBase>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txt_error: {
        fontSize: 12,
        color: 'red',
        marginTop: 5
    },
    input: {
        padding: 0,
        margin: 0,
        borderWidth: 0,
        fontSize: 14,
        flex: 1,
    },
    box_input: {
        width: '100%',
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C1F0B7',
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: 1
    }
})