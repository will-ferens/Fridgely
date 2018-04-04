import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import UserCamera from "./components/UserCamera"
import { StackNavigator } from 'react-navigation'



class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Text>Will LIkes Oranges</Text>
        <Text>Hot Dog no Hot dog .</Text>
        <Button 
          title="Get Started"
          onPress={() => this.props.navigation.navigate('UserCamera')}
        />
      </View>
    );
  }
}

export default StackNavigator ({
  Home: {
    screen: App,
  },
  UserCamera: {
    screen: UserCamera,
  },
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff12",
    alignItems: "center",
    justifyContent: "center",
  },
});
