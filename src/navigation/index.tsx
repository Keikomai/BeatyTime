import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NAVIGATION } from "../constants/navigations";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen/NewPasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen/ConfirmEmailScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NAVIGATION.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={NAVIGATION.SIGN_UP} component={SignUpScreen} />
        <Stack.Screen
          name={NAVIGATION.CONFIRM_EMAIL}
          component={ConfirmEmailScreen}
        />
        <Stack.Screen
          name={NAVIGATION.FORGET_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={NAVIGATION.NEW_PASSWORD}
          component={NewPasswordScreen}
        />

        <Stack.Screen name={NAVIGATION.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
