import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Expo from "expo";

// 3rd Party Imports
import { Container } from 'native-base';

// Project Imports
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  render() {
    return (
      <Container>
        <HomeScreen />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
