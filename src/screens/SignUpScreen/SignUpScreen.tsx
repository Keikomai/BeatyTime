import React, { useCallback, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/_atoms/CustomInput";
import CustomButton from "../../components/_atoms/CustomButton";
import SocialSignInButtons from "../../components/_molecules/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../constants/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, number, object, string } from "yup";
import { SignUpModel } from "../../types/mode.type";
import { Auth, AuthError, CognitoUser } from "aws-amplify";
import Toast from "react-native-toast-message";

const validationSchema = object({
  userName: string().required("Required*"),
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  repeatPassword: string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Repeat password is required"),
  email: string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});

const initialValues: SignUpModel = {
  userName: "1",
  password: "111111111",
  email: "2@g.com",
  repeatPassword: "111111111",
};

const SignUpScreen = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRegisterPressed = useCallback(
    async (data: SignUpModel) => {
      const { email, password, repeatPassword, userName } = data;

      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        const res = await Auth.signUp({
          username: userName,
          password: password,
          attributes: {
            name: userName,
            email: email,
            preferred_username: userName,
          },
        }).then(() => {
          //@ts-ignore
          navigation.navigate("ConfirmEmail", { userName: userName });
        });
        console.log(res, "res");
      } catch (error: AuthError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
          position: "bottom",
        });

        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const onSignInPress = useCallback(() => {
    //@ts-ignore
    navigation.navigate("SignIn");
  }, []);

  const onTermsOfUsePressed = useCallback(() => {
    console.warn("onTermsOfUsePressed");
  }, []);

  const onPrivacyPressed = useCallback(() => {
    console.warn("onPrivacyPressed");
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput name="userName" control={control} placeholder="Username" />
        <CustomInput name="email" control={control} placeholder="Email" />
        <CustomInput name="password" control={control} placeholder="Password" />
        <CustomInput
          name="repeatPassword"
          control={control}
          placeholder="Repeat Password"
        />

        <CustomButton
          text={isLoading ? "Loading ..." : "Register"}
          isDisabled={isLoading}
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
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

export default SignUpScreen;
