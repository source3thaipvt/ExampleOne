import { Text, StyleSheet, View, TextInputProps, TextInput, ViewStyle } from 'react-native'
import React, { Component } from 'react'
import TextViewBase from './TextViewBase'
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
        const { isError, initValue, placeholder, captionError, containerStyles, boxStyles } = this.props
        const { value, focus, error, disable } = this.state
        
        return (
            <View style={{ ...containerStyles, backgroundColor: 'transparent' }}>
                <View style={{
                    ...styles.box_input, ...boxStyles, 
                    borderColor: this.state.focus ? 'blue' : 'gray'
                }}>
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
        justifyContent: 'center',
        backgroundColor: '#C1F0B7',
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: 1
    }
})