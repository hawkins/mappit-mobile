import React from "react";
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Text,
  Left,
  Right,
  Body,
  Icon,
  View,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { StyleSheet, ScrollView } from "react-native";
import { Constants } from "expo";
import { observer } from "mobx-react";

@observer
export default class PostScreen extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <Container>
        <ScrollView>
          <Header style={styles.banner}>
            <Left>
              <Button onPress={() => (store.screen = "home")} transparent>
                <Icon
                  ios="ios-arrow-back"
                  android="md-arrow-back"
                  style={{ color: "white" }}
                />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Comments</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            {store.comments.map(c => (
              <Card key={`${c.date}-${c.user}`}>
                <CardItem>
                  <Left>
                    <View style={styles.row}>
                      <Thumbnail source={{ uri: c.picUrl }} />
                      <Text style={styles.name}>{c.user}</Text>
                    </View>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text style={styles.paragraph}>{c.comment}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>Posted on {new Date(c.date).toDateString()}</Text>
                  </Body>
                </CardItem>
              </Card>
            ))}
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "rgb(206, 44, 40)",
    padding: 16,
    marginTop: Constants.statusBarHeight
  },
  title: {
    fontSize: 18,
    color: "#fff",
    flex: 3
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  name: {
    fontWeight: "bold",
    margin: 15
  },
  paragraph: {
    marginTop: 15
  }
});
