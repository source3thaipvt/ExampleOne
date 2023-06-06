import { Text, StyleSheet, View, useColorScheme, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import NavigationService from './NavigationService'
import { AppContainer } from './AppContainer'

interface Props { }


function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

const App = () => {
    const isDarkMode = useColorScheme() == 'dark'
    return (
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
        </SafeAreaView>
    )
}

export default App
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


