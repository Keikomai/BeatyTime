import { Auth } from "aws-amplify";
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import CustomButton from "../../components/_atoms/CustomButton";

const HomeScreen = () => {
  const signOut = useCallback(async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>
        Home, sweet home
      </Text>
      <CustomButton text="Sign Out" onPress={signOut} type="TERTIARY" />
    </View>
  );
};

export default HomeScreen;
