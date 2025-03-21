import React from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const LoginScreen = () => {
  const handleGoogleSignIn = async () => {
    try {

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);

      // User is now signed in
      console.log('Google sign-in successful');

      navigation.reset({
        index: 0,
        routes: [{ name: 'AppTabs'}],
      })
    } catch (error) {
      console.error('Google sign-in error:', error);
      //Alert.alert('Sign-in Error', error.message);
    }
  };

  return (
    <View>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

export default LoginScreen;
