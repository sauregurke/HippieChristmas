import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from "react-native-gesture-handler"

import LoginScreen from './app/login'
import AppTabs from './app/app-tabs'
import ItemDetail from './app/item-detail'
  
/*
This code can be added back once Firebase implementation is complete.

LoginScreen: LoginScreen,

<Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} // Hide header for login screen
          />
          */

const Stack = createNativeStackNavigator({
  screens: {
    
    Tabs: AppTabs,
    ItemDetail: ItemDetail,
  }
})

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f2350f',
            },
            headerTitleStyle: { 
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}>
          <Stack.Screen
            name="Tabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetail}
            options={{ title: 'Gift Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}