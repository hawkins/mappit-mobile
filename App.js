import React from "react";
import Expo from "expo";
import {
  Container,
  Button,
  Text,
  Drawer,
  View,
  Icon,
  Thumbnail,
  Header,
  Left,
  Right,
  Body
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
              <Header style={styles.banner}>
                <Left>
                  <Button transparent onPress={closeDrawer}>
                    <Icon name="menu" style={styles.menuButton} />
                  </Button>
                </Left>
                <Body />
                <Right />
              </Header>

              <Text style={styles.section}>My Profile</Text>

              {store.user ? (
                <View style={styles.padded}>
                  <Thumbnail source={{ uri: store.user.photoURL }} />
                  <Text style={styles.nameText}>
                    Welcome back, {store.user.displayName}.
                  </Text>
                </View>
              ) : (
                <Button style={styles.button} onPress={this.signIn.bind(this)}>
                  <Text>Sign in with Google</Text>
                </Button>
              )}

              <Button
                transparent
                onPress={async () => {
                  await store.loadTopology("Home");
                  closeDrawer();
                }}
              >
                <Text>Go Home</Text>
              </Button>

              {store.user !== null && store.myTopologys !== null ? (
                <View>
                  <Text style={styles.section}>My Topographies</Text>
                  {store.myTopologys.map(t => (
                    <Button
                      transparent
                      key={t.key}
                      onPress={async () => {
                        await store.loadTopology(t.key);
                        closeDrawer();
                      }}
                    >
                      <Thumbnail
                        small
                        source={{ uri: t.ownerPic }}
                        style={styles.thumbnail}
                      />
                      <View style={styles.topographyView}>
                        <Text>{t.key}</Text>
                        <Text style={styles.ownerName}>by {t.ownerName}</Text>
                      </View>
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
                      key={t.key}
                      onPress={async () => {
                        await store.loadTopology(t.key);
                        closeDrawer();
                      }}
                    >
                      <Thumbnail
                        small
                        source={{ uri: t.ownerPic }}
                        style={styles.thumbnail}
                      />
                      <View style={styles.topographyView}>
                        <Text>{t.key}</Text>
                        <Text style={styles.ownerName}>by {t.ownerName}</Text>
                      </View>
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
  banner: {
    backgroundColor: "rgb(206, 44, 40)"
  },
  menuButton: {
    color: "white",
    paddingBottom: 14
  },
  padded: {
    padding: 15
  },
  section: {
    padding: 15,
    fontWeight: "bold"
  },
  button: {
    marginLeft: 15,
    marginTop: 15
  },
  drawer: {
    marginTop: Expo.Constants.statusBarHeight,
    height: "100%",
    backgroundColor: "white"
  },
  nameText: {
    paddingTop: 15
  },
  thumbnail: {
    marginLeft: 15
  },
  topographyView: {
    flexDirection: "column",
    display: "flex",
    paddingLeft: 5
  },
  ownerName: {
    fontSize: 11
  }
});
