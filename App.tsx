// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from './app/(tabs)/index'
import NewPost from './app/(tabs)/new-post'
import MyPosts from './app/(tabs)/my-posts'


function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel = 'false'

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
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
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



export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen
          name="Home"
          component={Index}
          options={{title: 'Welcome'}}
        />
        <Tabs.Screen
          name="New Post"
          component={NewPost}
          options={{title: 'Add a Gift'}}
        />
        <Tabs.Screen
          name="My Posts"
          component={MyPosts}
          options={{title: 'My Gifts'}}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}