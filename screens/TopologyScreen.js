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
  Icon
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
              <Label>Topology description</Label>
              <Input
                onChangeText={description => this.setState({ description })}
              />
            </Item>
            <Text>Click Submit to continue to select pin location</Text>
            <Button
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
    margin: 8
  }
});
