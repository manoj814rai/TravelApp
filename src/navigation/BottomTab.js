import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

export const BottomTabComponent = ({ data, wrapperStyle }) => {
    const Tab = createBottomTabNavigator();
    const tabs = data.map(item => {
        const options = {
            tabBarIcon: ({ focused }) => {
                const Unselected = item.unselectedTabIcon;
                const Selected = item.selectedTabIcon;
                return focused ? <Selected /> : <Unselected />;
            },
            headerShown: false,
        };
        return (
            <Tab.Screen
                name={item.title}
                component={item.PageComponent}
                key={item.name}
                options={options}
            />
        );
    });

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIconStyle: styles.tabBarIconStyle,
                headerShown: false
            }}>
            {tabs}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        marginBottom: '5%',
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    tabBarIconStyle: {
        marginTop: '5%',
    },
});