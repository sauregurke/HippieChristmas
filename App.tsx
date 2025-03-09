// In App.js in a new project

import * as React from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';

// Authentication
//import auth from '@react-native-firebase/auth'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Index from './app/(tabs)/index'
import NewPost from './app/(tabs)/new-post'
import MyPosts from './app/(tabs)/my-posts'
import { Colors } from 'react-native/Libraries/NewAppScreen';


function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row', height: 80 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key} 
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {options.tabBarIcon && options.tabBarIcon({ focused: isFocused })}
            <Text style={{ color: isFocused ? '#f2350f' : '#f2350f' }}>
            {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

//const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator({
  screens: {
    Home: Index,
    NewPost: NewPost,
    MyPosts: MyPosts,
  }
})

//const user = await auth.signInAnonymously()
//console.log(user)
//const authenticateUserAsync = async () => {

//}

export default function App() {
  

  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f2350f',   // title bar color
          },
          headerTitleStyle: { 
            color: Colors.white,          // title text color
            fontWeight: 'bold',
            fontSize: '20'
          }, 
        }}>
        <Tabs.Screen
          name="Hippie Christmas!"
          component={Index}
          options={{
            tabBarLabel: '',
            title: 'Hippie Christmas!',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                  name={focused ? 'home' : 'home-outline'} 
                  size={30}
                  color={"#f2350f"}
              />
            )
          }}
        />
        <Tabs.Screen
          name="New Post"
          component={NewPost}
          options={{
            tabBarLabel: '',
            title: 'Add a Gift',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                  name={focused ? "add-circle" : "add-circle-outline"} 
                  size={45}
                  color={"#f2350f"}
              />
            )
          }}
        />
        <Tabs.Screen
          name="My Posts"
          component={MyPosts}
          options={{
            tabBarLabel: '',
            title: 'My Gifts',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                  name={focused ? "list" : "list-outline"} 
                  size={30}
                  color={"#f2350f"}
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}