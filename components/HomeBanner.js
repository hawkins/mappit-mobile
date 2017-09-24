import React from "react";
import { observer } from "mobx-react";
import { Platform, StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

@observer
export default class HomeBanner extends React.Component {
  render() {
    return (
      <Header style={styles.banner}>
        {this.props.children ? <Left>{this.props.children}</Left> : null}
        <Body>
          <Title style={styles.title}>
            {this.props.store.currentTopology
              ? this.props.store.currentTopology.name
              : "Mappit"}
          </Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

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
