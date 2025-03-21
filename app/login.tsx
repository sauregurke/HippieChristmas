import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID',
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert('Google Sign-in Error', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      Alert.alert('Sign-out Error', error.message);
    }
  };

  if (initializing) return null;

  return (
    <View>
      {user ? (
        <Button title="Sign Out" onPress={handleSignOut} />
      ) : (
        <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
      )}
    </View>
  );
};

export default LoginScreen;
