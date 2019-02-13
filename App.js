import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import MapScreen from './src/tela/MapScreen';

const _Container = createBottomTabNavigator({
    HomeScreen: {
        screen: MapScreen, 
    },
});

const AppContainer = createAppContainer(_Container);

export default AppContainer;