import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
// new
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, ActivityIndicator, Pressable } from 'react-native';
//import { auth } from '../firebaseConfig'; // move?

//import { onAuthStateChanged, signInAnonymously, User, signOut } from "firebase/auth";
//import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RootLayout() {
  //const [user, setUser] = useState<User | null>(null);

  /*
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("USER IS STILL LOGGED IN: " , user);
        setUser(user);
      }
    });
  }, [])

  const handleLogin = () => {
    signInAnonymously(auth).then((userCredential) => {
        console.log('User logged in successfully: ', userCredential)
        setUser(userCredential.user)
    })
    .catch((error) => {
        console.log('Error', error)
    })

    if (!user) {
      return (
          <View style={styles.container}>
              <Text style={styles.text}>Welcome to Hippie Christmas!</Text>
              <Button title="Begin - terms conditions agreed" onPress={handleLogin}/>
          </View>
      )
  }
  
    
}
*/
  return (
    <>
    <StatusBar style="light" /> 
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center'
  },
  text: {
    color:'#000',
    textAlign: 'center',
    paddingHorizontal:20
  }
});