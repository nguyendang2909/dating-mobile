import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { ViewStyle } from 'react-native';

import { Screen, Text } from '../components';
import { AppStackParamList, AppStackScreenProps } from '../navigators';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SignIn: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SignIn" component={SignInScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SignInScreen: FC<
  StackScreenProps<AppStackScreenProps<keyof AppStackParamList>, 'SignIn'>
> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="signIn" />
    </Screen>
  );
};

const $root: ViewStyle = {
  flex: 1,
};
