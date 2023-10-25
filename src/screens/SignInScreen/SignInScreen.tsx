import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";
import { Auth, AuthError, CognitoUser } from "aws-amplify";
import Toast from "react-native-toast-message";
import * as LocalAuthentication from "expo-local-authentication";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../../components/_atoms/CustomInput";
import CustomButton from "../../components/_atoms/CustomButton";
import SocialSignInButtons from "../../components/_molecules/SocialSignInButtons";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, number, object, string } from "yup";
import { SignInModel } from "../../types/mode.type";

const validationSchema = object({
  userName: string().required("Required*"),
  password: string().required("Required*"),
});

const initialValues: SignInModel = {
  userName: "maxim",
  password: "11111111",
};

const SignInScreen = ({ navigation }: any) => {
  const { height } = useWindowDimensions();
  const rnBiometrics = new ReactNativeBiometrics();

  const { handleSubmit, control } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(async () => {
    const { biometryType } = await rnBiometrics.isSensorAvailable();

    console.log("Biometrics is supported", biometryType);
  }, []);
  const onSignInPressed = useCallback(async (data: SignInModel) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await Auth.signIn(data.userName, data.password).then(
        (item): CognitoUser => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: `Hello ${item.username}`,
            position: "bottom",
          });
        }
      );
    } catch (error: AuthError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        position: "bottom",
      });
    }
    setIsLoading(false);
  }, []);

  const onForgotPasswordPressed = useCallback(() => {
    navigation.navigate("ForgotPassword");
  }, [navigation]);

  const onSignUpPress = useCallback(() => {
    if (isError) {
      return;
    }
    navigation.navigate("SignUp");
  }, [isError, navigation]);

  const scanFingerprint = async () => {
    let result = await LocalAuthentication.authenticateAsync();
    let result2 = await LocalAuthentication.getEnrolledLevelAsync();
    console.log("Scan Result:", result2);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={require("../../assets/images/Logo_1.png")}
          style={{ height: height * 0.3 }}
          resizeMode="contain"
        />

        <CustomInput name="userName" placeholder="Username" control={control} />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
        />

        <CustomButton
          text={isLoading ? "Loading ..." : "Sign In"}
          isDisabled={isLoading}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
      <TouchableOpacity onPress={scanFingerprint} style={styles.button}>
        <Text style={styles.buttonText}>SCAN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 60,
    backgroundColor: "#056ecf",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
  },
});

export default SignInScreen;
