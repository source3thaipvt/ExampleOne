import { Text, StyleSheet, View, useColorScheme, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import NavigationService from './NavigationService'
import { AppContainer } from './AppContainer'
import AuthProvider, { AuthContext } from '../../context/AuthContext'
import { firebase } from '@react-native-firebase/analytics';
import Loading from '../../component/Loading'
import { Provider } from 'react-redux'
import store from '../../../redux/store'

interface Props { }

const App = () => {
    const isDarkMode = useColorScheme() == 'dark'
    useEffect(() => {
        const setAnalytic = async () => {
            // Analytics automatically tracks some information about screens in your application
            await firebase.analytics().setAnalyticsCollectionEnabled(true);
        }
        setAnalytic()
    }, [])

    return (
        <Provider store={store}>
            <AuthProvider>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                        backgroundColor={'transparent'}
                    />
                    <NavigationContainer
                        ref={ref => {
                            if (ref) {
                                NavigationService.setTopLevelNavigator(ref)
                            }
                        }}
                    >
                        <AppContainer />
                    </NavigationContainer>
                    <Loading />
                </SafeAreaView>
            </AuthProvider>
        </Provider>
    )
}

export default App
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


