import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../login/LoginScreen';
import { ParamListBase } from '@react-navigation/native';
import OtpScreen from '../otp/OtpScreen';
import HomeScreen from '../home/HomeScreen';
import ProfileScreen from '../profile/ProfileScreen';

export interface NavigatorParamsList extends ParamListBase {
    login: undefined;
    home: undefined;
    otp: undefined;
    profile: undefined;
}
const Stack = createStackNavigator<NavigatorParamsList>();

export enum ScreenName {
    LOGINSCREEN = 'LoginScreen',
    OTPSCREEN = 'OtpScreen',
    HOMESCREEN = 'HomeScreen',
    PROFILESCREEN = "ProfileScreen"
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
            <Stack.Screen
                name={ScreenName.PROFILESCREEN}
                component={ProfileScreen}
                options={{
                }} />
        </Stack.Navigator>
    );
}
export { AppContainer }


