import React, { useCallback } from "react";
import { View, Text } from "react-native";
import CustomButton from "../../_atoms/CustomButton";

const SocialSignInButtons = () => {
  const onSignInFacebook = useCallback(() => {
    console.warn("onSignInFacebook");
  }, []);

  const onSignInGoogle = useCallback(() => {
    console.warn("onSignInGoogle");
  }, []);

  const onSignInApple = useCallback(() => {
    console.warn("onSignInApple");
  }, []);

  return (
    <>
      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
