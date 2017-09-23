import React from "react";
import Expo from "expo";
import { Container, Button, Text, Drawer, View, Icon } from "native-base";
import { StyleSheet } from "react-native";

// Project Imports
import firebase from "./lib/firebase";
import HomeScreen from "./screens/HomeScreen";

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
    const result = await firebase.signInWithGoogle();

    if (result.error) this.setState({ error: true });
    else if (result.canceled) this.setState({ canceled: true });
    else this.setState({ auth: true });
  }

  render() {
    const { auth, error, canceled } = this.state;

    // TODO: Raise these
    closeDrawer = () => {
      this.drawer._root.close();
    };
    openDrawer = () => {
      this.drawer._root.open();
    };

    return (
      <Drawer
        ref={ref => (this.drawer = ref)}
        content={
          <Container style={styles.drawer}>
            <Button transparent onPress={closeDrawer}>
              <Icon name="menu" />
            </Button>
            <Button onPress={this.signIn.bind(this)}>
              <Text>Sign in with Google</Text>
            </Button>
            <Text>
              {auth ? "Logged in" : null}
              {error ? "An error occurred" : null}
              {canceled ? "Canceled login" : ""}
            </Text>
          </Container>
        }
      >
        <Container>
          <HomeScreen openDrawer={openDrawer} closeDrawer={closeDrawer} />
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    paddingTop: 20,
    height: "100%",
    backgroundColor: "white"
  }
});
