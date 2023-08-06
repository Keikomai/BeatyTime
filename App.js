import Navigation from "./src/navigation";
import { SafeAreaView, StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import Toast from "react-native-toast-message";

import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
      <Toast />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F9FBFC",
    flex: 1,
  },
});
