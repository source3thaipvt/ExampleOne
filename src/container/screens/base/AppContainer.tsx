import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../login/LoginScreen';
import { ParamListBase } from '@react-navigation/native';
import OtpScreen from '../otp/OtpScreen';
import HomeScreen from '../home/HomeScreen';

export interface NavigatorParamsList extends ParamListBase {
    login: undefined;
    home: undefined;
    otp: undefined;
  }
const Stack = createStackNavigator<NavigatorParamsList>();

export enum ScreenName {
    LOGINSCREEN = 'LoginScreen',
    OTPSCREEN = 'OtpScreen',
    HOMESCREEN = 'HomeScreen',
}

const AppContainer = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={ScreenName.LOGINSCREEN}>
            <Stack.Screen
                name={ScreenName.LOGINSCREEN}
                component={LoginScreen}
                options={{
                    
                }} />
            <Stack.Screen
                name={ScreenName.OTPSCREEN}
                component={OtpScreen}
                options={{

                }} />
            <Stack.Screen
                name={ScreenName.HOMESCREEN}
                component={HomeScreen}
                options={{

                }} />
        </Stack.Navigator>
    );
}
export { AppContainer }


