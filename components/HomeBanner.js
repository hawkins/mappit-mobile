import React from "react";

import { Platform, StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

const HomeBanner = ({ children }) => (
  <Header style={styles.banner}>
    {children ? <Left>{children}</Left> : null}
    <Body>
      <Title style={styles.title}>Mappit</Title>
    </Body>
    <Right />
  </Header>
);

export default HomeBanner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#3F51B5",
    padding: 16
    // marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    margin: 8
  }
});
