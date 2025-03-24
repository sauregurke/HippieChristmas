import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Text, PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Index from './(tabs)/index'
import NewPost from './(tabs)/new-post'
import MyPosts from './(tabs)/my-posts'

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps ) {
    const { buildHref } = useLinkBuilder();
  
    return (
      <View style={{ flexDirection: 'row', height: 80 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
          typeof options.tabBarLabel === 'string'
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
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: '#f2350f', size: 30 })}
              <Text style={{ color: isFocused ? '#f2350f' : '#f2350f' }}>
              {label}
              </Text>
            </PlatformPressable>
          );
        })}
      </View>
    );
  }
  
  const Tabs = createBottomTabNavigator();
  
  export default function AppTabs() {
  
    return (
      <GestureHandlerRootView>
      <NavigationContainer>
        <Tabs.Navigator
          tabBar={(props) => <MyTabBar {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f2350f',   // title bar color
            },
            headerTitleStyle: { 
              color: '#FFFFFF',          // title text color
              fontWeight: 'bold',
              fontSize: 20
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
      </GestureHandlerRootView>
    );
  }