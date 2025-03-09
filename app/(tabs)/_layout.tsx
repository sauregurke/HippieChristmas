import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function TabsLayout() {
    return (
      <Tabs
          screenOptions={{

              tabBarActiveTintColor: "#f2350f",
              headerStyle: {
                  //backgroundColor: "#f2f2f2", // other 25292e, FAF9F6 for off white
                  backgroundColor: "#F2350F"
                  
              },

              headerShadowVisible: false,
              headerTintColor: "#fff",
              headerTitleStyle: {
                color: "#fff",
                fontSize: 25,
                //fontFamily: 'Poppins',
              },

              tabBarLabelStyle: {
                display: 'none',
              },
              
              tabBarStyle: {
                  backgroundColor: "#fff",
                  height: 90,
                  justifyContent: 'center',
                  paddingTop: 10, // no clue why this was needed and make note it's here
              },
          }}>
        <Tabs.Screen name="index" 
        options={{
            headerTitle: "Hippie Christmas!",
            tabBarShowLabel: true,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                  name={focused ? "home-sharp" : "home-outline"} 
                  size={30}
                  color={"#f2350f"}
              />
            )
        }} />
        <Tabs.Screen name="new-post"
        options={{
            headerTitle: "Add a Gift",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                    name={focused ? "add-circle" : "add-circle-outline"} 
                    size={30}
                    color={"#f2350f"}
                />
              )
            }
        } />
        <Tabs.Screen name="my-posts"
        options={{
            headerTitle: "My Listings",
            tabBarShowLabel: true,
            tabBarIcon: ({focused, color}) => (
                <Ionicons
                    name={focused ? "list" : "list-outline"} 
                    size={30}
                    color={"#f2350f"}
                />
              )
        }} />
      </Tabs>
      );
  }