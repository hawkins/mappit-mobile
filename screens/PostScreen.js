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
  Text
} from "native-base";
import { StyleSheet } from "react-native";

export default class PostScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      content: ""
    };
  }

  render() {
    const { store } = this.props;

    return (
      <Container>
        <Header style={styles.banner}>
          <Title style={styles.title}>New Pin</Title>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Pin Title</Label>
              <Input onChangeText={title => this.setState({ title })} />
            </Item>
            <Item regular>
              <Input
                placeholder="Pin content"
                onChangeText={content => this.setState({ content })}
              />
            </Item>
            <Text>Click Submit to continue to select pin location</Text>
            <Button
              onPress={() => {
                store.newPinTitle = this.state.title;
                store.newPinContent = this.state.content;
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
