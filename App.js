import React from "react";
import Expo from "expo";
import { Container, Header, Title } from "native-base";
import Map from "./components/map";

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Mappit</Title>
        </Header>
        <Map />
      </Container>
    );
  }
}
