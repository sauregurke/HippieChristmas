import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const LoginScreen = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  
  const handleGoogleSignIn = async () => {
    try {
      // Get the user's Google sign-in information
      const userInfo = await GoogleSignin.signIn();

      // Create a Google credential with the token

      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);

      // Sign-in the user with the Google credential
      await auth().signInWithCredential(googleCredential);

      // User is now signed in
      console.log('Google sign-in successful');

      GoogleSignin.getTokens().then((tokens) => {
        console.log("ID Token:", tokens.idToken);
        console.log("Access Token:", tokens.accessToken);
    });

    } catch (error) {
      console.error('Google sign-in error:', error);
      //Alert.alert('Sign-in Error', error.message);
    }
  };

  const handleAppleSignIn = async () => {

  }

  return (
    <View>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
      <Button title="Sign in with Apple" onPress={handleAppleSignIn} />
    </View>
  );
};

export default LoginScreen;
