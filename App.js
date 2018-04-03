import React from "react"
import { StyleSheet, Text, View } from "react-native"
import UserCamera from "./components/UserCamera"
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UserCamera />
        <Text>Will LIkes Oranges</Text>
        <Text>Hot Dog no Hot dog .</Text>
        <Text>Shaun is a bitch your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff12",
    alignItems: "center",
    justifyContent: "center",
  },
});
