import React from "react";

import { Platform, StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

const HomeBanner = () => (
  <Header style={styles.banner}>
    <Body>
      <Title style={styles.title}>Mappit</Title>
    </Body>
  </Header>
);

export default HomeBanner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    padding: 16
    // marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    margin: 8
  }
});
