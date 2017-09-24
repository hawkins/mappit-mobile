import React from "react";
import { observer } from "mobx-react";
import { Platform, StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";
import { Constants } from "expo";

@observer
export default class HomeBanner extends React.Component {
  render() {
    return (
      <Header style={styles.banner}>
        {this.props.children ? <Left>{this.props.children}</Left> : null}
        <Body style={styles.body}>
          <Title style={styles.title}>
            {this.props.store.currentTopology
              ? this.props.store.currentTopology.key
              : "Mappit"}
          </Title>
        </Body>
        <Right>
          {this.props.store.user && this.props.store.currentTopology ? (
            this.props.store.subscribed ? (
              <Button
                transparent
                disabled={!this.props.store.user}
                onPress={() => {
                  this.props.store.unsubscribeToCurrentTopology();
                  this.forceUpdate();
                }}
              >
                <Icon
                  name="ios-checkmark-circle-outline"
                  style={{ color: "white" }}
                />
              </Button>
            ) : (
              <Button
                transparent
                disabled={!this.props.store.user}
                onPress={() => {
                  this.props.store.subscribeToCurrentTopology();
                  this.forceUpdate();
                }}
              >
                <Icon
                  name="ios-remove-circle-outline"
                  style={{ color: "white" }}
                />
              </Button>
            )
          ) : (
            <Right />
          )}
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "rgb(206, 44, 40)",
    padding: 16,
    marginTop: Constants.statusBarHeight
    // marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  body: {
    flex: 3
  },
  title: {
    fontSize: 18,
    color: "#fff"
  }
});
