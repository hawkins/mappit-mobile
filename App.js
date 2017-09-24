import React from "react";
import Expo from "expo";
import {
  Container,
  Button,
  Text,
  Drawer,
  View,
  Icon,
  Thumbnail
} from "native-base";
import { StyleSheet, ScrollView } from "react-native";
import { observer } from "mobx-react";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import TopologyScreen from "./screens/TopologyScreen";
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
            <ScrollView>
              <Button transparent onPress={closeDrawer}>
                <Icon name="menu" />
              </Button>

              <Text style={styles.section}>My Profile</Text>

              {store.user ? (
                <View style={styles.padded}>
                  <Thumbnail source={{ uri: store.user.photoURL }} />
                  <Text style={styles.nameText}>Welcome back, {store.user.displayName}.</Text>
                </View>
              ) : (
                <Button style={styles.button} onPress={this.signIn.bind(this)}>
                  <Text>Sign in with Google</Text>
                </Button>
              )}

              {store.user !== null && store.myTopologys !== null ? (
                <View>
                  <Text style={styles.section}>My Topographies</Text>
                  <Button
                    transparent
                    onPress={async () => {
                      await store.loadTopologys("Home");
                      closeDrawer();
                    }}
                  >
                    <Text>Home</Text>
                  </Button>
                  {store.myTopologys.map(t => (
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

              {store.topologys !== undefined ? (
                <View>
                  <Text style={styles.section}>All Topographies</Text>
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
            </ScrollView>
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
          {store.screen === "topology" ? (
            <TopologyScreen store={store} />
          ) : null}
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  padded: {
    padding: 15
  },
  section: {
    padding: 15,
    fontWeight: "bold"
  },
  button: {
    margin: 15
  },
  drawer: {
    paddingTop: 20,
    height: "100%",
    backgroundColor: "white"
  },
  nameText: {
    paddingTop: 15
  }
});
