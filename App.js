import React from "react";
import Expo from "expo";
import { Container, Button, Text, Drawer, View, Icon } from "native-base";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react";

// Project Imports
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import Store from "./lib/store";

const store = new Store();

@observer
export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  async signIn() {
    await store.login();
  }

  render() {
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

            {store.user ? (
              <Text>Welcome back, {store.user.displayName}</Text>
            ) : (
              <Button onPress={this.signIn.bind(this)}>
                <Text>Sign in with Google</Text>
              </Button>
            )}

            {store.topologys !== undefined ? (
              <View>
                <Text>Topologies</Text>
                <Button
                  transparent
                  onPress={async () => {
                    await store.loadTopology("Home");
                    closeDrawer();
                  }}
                >
                  <Text>Home</Text>
                </Button>
                {store.topologys.map(t => (
                  <Button
                    transparent
                    key={t}
                    onPress={async () => {
                      await store.loadTopology(t);
                      closeDrawer();
                    }}
                  >
                    <Text>{t}</Text>
                  </Button>
                ))}
              </View>
            ) : null}
          </Container>
        }
      >
        <Container>
          {/* My eyes are literally bleeding rn */}
          {store.screen === "home" ? (
            <HomeScreen
              openDrawer={openDrawer}
              closeDrawer={closeDrawer}
              store={store}
            />
          ) : null}
          {store.screen === "post" ? <PostScreen store={store} /> : null}
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
