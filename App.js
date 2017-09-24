import React from "react";
import Expo from "expo";
import { Container, Button, Text } from "native-base";

// Project Imports
import Map from "./components/map";
import firebase from "./lib/firebase";
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      error: false,
      auth: false,
      canceled: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  async signIn() {
    const result = await firebase.getTopologys();
    console.log(result);
    if (result.error) this.setState({ error: true });
    else if (result.canceled) this.setState({ canceled: true });
    else this.setState({ auth: true });
  }

  render() {
    const { auth, error, canceled } = this.state;

    return (
      <Container>
        <HomeScreen />
        <Button onPress={this.signIn.bind(this)}>
          <Text>Sign in with Google</Text>
        </Button>
        <Map />
        <Text>
          {auth ? "Logged in" : null}
          {error ? "An error occurred" : null}
          {canceled ? "Canceled login" : ""}
        </Text>
      </Container>
    );
  }
}
