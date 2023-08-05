import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from "react-native";
import CustomInput from "../../components/_atoms/CustomInput";
import CustomButton from "../../components/_atoms/CustomButton";
import SocialSignInButtons from "../../components/_molecules/SocialSignInButtons";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, number, object, string } from "yup";
import { SignInModel } from "../../types/mode.type";
const SignInScreen = ({ navigation }: any) => {
  const { height } = useWindowDimensions();

  const validationSchema = object({
    userName: string().required("validation.adGroupName"),
    password: string().required("validation.selectStatus"),
  });

  const initialValues: SignInModel = {
    userName: "kk",
    password: "kkl",
  };

  const { formState, handleSubmit, setError, control, reset } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const [isError, setIsError] = useState<boolean>(false);

  const onSignInPressed = useCallback(
    (data: SignInModel) => {
      console.log(data, "data");

      // navigation.navigate("Home");
    },
    [navigation]
  );

  const onForgotPasswordPressed = useCallback(() => {
    navigation.navigate("ForgotPassword");
  }, []);

  const onSignUpPress = useCallback(() => {
    if (isError) {
      return;
    }
    navigation.navigate("SignUp");
  }, [isError, navigation]);

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

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
});

export default SignInScreen;
