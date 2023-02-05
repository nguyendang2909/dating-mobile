import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import { Config } from '../config';
import { AppStackScreenProps } from '../navigators';
import { apiSlice } from '../stores/api.store';

export const SignInScreen: FC<
  StackScreenProps<AppStackScreenProps, 'SignIn'>
> = () => {
  const navigation = useNavigation();

  const [handleLoginByGoogle] = apiSlice.useLoginByGoogleMutation();

  const handleOnPress = () => {
    console.log(111);
  };

  const [loggedIn, setloggedIn] = useState(false);

  const [userInfo, setuserInfo] = useState([]);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const googleUser = await GoogleSignin.signIn();

      console.log(googleUser);

      const { idToken } = googleUser;

      if (idToken) {
        await handleLoginByGoogle({ token: idToken }).unwrap();
      }

      // setloggedIn(true);
    } catch (error) {
      console.log(111, error);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      //   alert('Cancel');
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   alert('Signin in progress');
      //   // operation (f.e. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   alert('PLAY_SERVICES_NOT_AVAILABLE');
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: Config.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>asdasd</Text> */}
        <GoogleSigninButton
          // style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
          // disabled={this.state.isSigninInProgress}
        />
      </View>
    </>
  );
};
