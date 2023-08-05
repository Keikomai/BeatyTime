module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["react", "react-hooks", "react-native", "@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-native/all",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    rules: {
      // Add any additional rules or overrides you want to apply
      "react-native/no-unused-styles": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-native/split-platform-components": "warn",
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "warn",
      "react-native/no-single-element-style-arrays": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // Add other ESLint rules here as needed
    },
    settings: {
      // Add any settings specific to your Expo project
      react: {
        version: "detect", // Detect the installed version of React
      },
    },
  };
  