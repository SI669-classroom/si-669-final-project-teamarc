import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Icon} from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import GamesScreen from './screens/GamesScreen';
import PlaysScreen from './screens/PlaysScreen';

import { rootReducer } from './Reducer';


const store = configureStore({
  reducer: rootReducer,
});

function GamesTabStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='PlaysScreen' screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name='GamesHome' component={GamesHome}/> */}
      <Stack.Screen name='GamesScreen' component={GamesScreen}/>
      <Stack.Screen name="PlaysScreen" component={PlaysScreen}/>

    </Stack.Navigator>
  )
}

function OngoingGamesTabStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='OngoingGamesHome' screenOptions={{ headerShown: false }}>
    </Stack.Navigator>
  )
}

function ProfileTabStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='ProfileHome' screenOptions={{ headerShown: false }}>
    </Stack.Navigator>
  )
}

function AppContainer() {
  const Tabs = createBottomTabNavigator();


  return(
    <Provider store={store}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{headerShown: false}}
        >
          <Tabs.Screen 
            name="Games" 
            component={GamesTabStack}
            options={{
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Icon 
                    name="game-controller-outline"
                    type="ionicon"
                    color={color}
                    size={size}
                  />
                );
              }
            }}
          />
          <Tabs.Screen 
            name="Plays" 
            component={OngoingGamesTabStack}
            options={{
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Icon 
                    name="people-outline"
                    type="ionicon"
                    color={color}
                    size={size}
                  />
                );
              }
            }}/>
            <Tabs.Screen 
            name="Profile" 
            component={ProfileTabStack}
            options={{
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Icon 
                    name="person-outline"
                    type="ionicon"
                    color={color}
                    size={size}
                  />
                );
              }
            }}/>
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;