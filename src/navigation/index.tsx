import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NAVIGATION } from "../constants/navigations";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen/NewPasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen/ConfirmEmailScreen";
import { Auth, Hub } from "aws-amplify";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = useCallback(async () => {
    try {
      const userRes = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(userRes);
    } catch (error) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    console.log("sadcsdc");
    const listener = (data) => {
      console.log(data, "data");
      if (data.payload.event === "signOut" || data.payload.event === "signIn") {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name={NAVIGATION.HOME} component={HomeScreen} />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
