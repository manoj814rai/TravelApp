import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AvailableFlightList from '../screens/AvailableFlightList';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS_NAME } from '../utils/Consntants';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={SCREENS_NAME.HOME}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={SCREENS_NAME.HOME} component={HomeScreen} />
            <Stack.Screen name={SCREENS_NAME.SEARCH} component={SearchScreen} />
            <Stack.Screen name={SCREENS_NAME.AVAILABLE_FLIGHT_LIST} component={AvailableFlightList} />
        </Stack.Navigator>
    )
};

const AppRoute = () => {
    return(
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    )
}

export default AppRoute