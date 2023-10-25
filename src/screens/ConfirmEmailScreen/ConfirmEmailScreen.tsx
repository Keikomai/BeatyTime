import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/_atoms/CustomInput";
import CustomButton from "../../components/_atoms/CustomButton";
import SocialSignInButtons from "../../components/_molecules/SocialSignInButtons";
import { useForm } from "react-hook-form";
import { Auth, AuthError, CognitoUser } from "aws-amplify";
import { boolean, number, object, string } from "yup";
import { CodeModel } from "../../types/mode.type";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast, { ToastRef } from "react-native-toast-message";

type ConfirmEmailScreen = {
  navigation: any;
  route: any;
};

const validationSchema = object({
  code: string().required("Required*"),
});

const initialValues: CodeModel = {
  code: "",
};

const ConfirmEmailScreen = ({ navigation, route }: ConfirmEmailScreen) => {
  const param: { userName: string } = route.params;

  const { handleSubmit, control } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onConfirmPressed = useCallback(
    async (data: CodeModel) => {
      try {
        await Auth.confirmSignUp(param.userName, data.code);
      } catch (error: AuthError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
          position: "bottom",
        });
      }

      navigation.navigate("Home");
    },
    [param]
  );

  const onSignInPress = useCallback(() => {
    navigation.navigate("SignIn");
  }, []);

  const onResendPress = useCallback(async () => {
    try {
      await Auth.resendSignUp(param.userName);
    } catch (error: AuthError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        position: "bottom",
      });
    }
  }, [param]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default ConfirmEmailScreen;
