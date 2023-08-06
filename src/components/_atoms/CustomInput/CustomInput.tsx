import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { COLOR } from "../../../constants/colorScheme";
import { SignInModel, SignUpModel } from "../../../types/mode.type";

type CustomInputProps = {
  name: keyof (SignInModel | SignUpModel);
  control: Control<SignInModel | SignUpModel>;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
}: CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? COLOR.main.red : COLOR.action.border },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: COLOR.main.red, alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: COLOR.action.border,

    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 4,

    paddingHorizontal: 8,
    width: "100%",
  },
  input: {},
});

export default CustomInput;
