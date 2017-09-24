import React from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Title,
  Button,
  Text,
  Body,
  Left,
  Right,
  Icon,
  View
} from "native-base";
import { StyleSheet } from "react-native";

export default class PostScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: ""
    };
  }

  render() {
    const { store } = this.props;

    return (
      <Container>
        <Header style={styles.banner}>
          <Left>
            <Button
              onPress={() => {
                this.props.store.screen = "home";
              }}
              transparent
            >
              <Icon
                ios="ios-arrow-back"
                android="md-arrow-back"
                style={{ color: "white" }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>New Topography</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>New Topography's Name</Label>
              <Input onChangeText={name => this.setState({ name })} />
            </Item>
            <Item floatingLabel>
              <Label numberOfLines={20}>Topology description</Label>
              <Input
                onChangeText={description => this.setState({ description })}
              />
            </Item>

            <View style={styles.viewContainer}>
              <Text>Click 'Submit' to create a new Topology</Text>
            </View>
            <View style={styles.viewContainer}>
              <Button
                block
                style={styles.button}
                onPress={() => {
                  store.newTopologyName = this.state.name;
                  store.newTopologyDescription = this.state.description;
                  store.createTopology();
                  this.setState({ name: "", description: "" });
                  store.screen = "home";
                }}
              >
                <Text>Submit</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
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
    margin: 5
  },
  text: {
    fontSize: 10,
    margin: 5
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  button: {
    width: "50%"
  }
});
