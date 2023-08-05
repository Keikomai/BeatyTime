import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLOR } from "../../../constants/colorScheme";

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  bgColor?: string;
  fgColor?: string;
  type?: string;
};

const CustomButton = ({
  text,
  onPress,
  bgColor,
  fgColor,
  type = "PRIMARY",
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: COLOR.blue.main,
  },

  container_SECONDARY: {
    borderColor: COLOR.blue.main,
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: COLOR.main.white,
  },

  text_SECONDARY: {
    color: COLOR.blue.main,
  },

  text_TERTIARY: {
    color: COLOR.main.gray,
  },
});

export default CustomButton;
