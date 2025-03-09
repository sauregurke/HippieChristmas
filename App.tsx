// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './app/(tabs)/index'
import NewPost from './app/(tabs)/new-post'
import MyPosts from './app/(tabs)/my-posts'


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Index}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="New Post"
          component={NewPost}
          options={{title: 'Add a Gift'}}
        />
        <Stack.Screen
          name="My Posts"
          component={MyPosts}
          options={{title: 'My Gifts'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}