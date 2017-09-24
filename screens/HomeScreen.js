import React from "react";
import { Icon, View, Button, Fab, Container, Content } from "native-base";

// Project Imports
import Map from "../components/map";
import HomeBanner from "../components/HomeBanner";

class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false
    };
  }

  render() {
    const { openDrawer, closeDrawer, store } = this.props;

    return (
      <Container>
        <HomeBanner>
          <Button transparent onPress={openDrawer}>
            <Icon name="menu" style={{ color: "white" }} />
          </Button>
        </HomeBanner>
        <Container>
          <Map />
        </Container>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="share" />
          <Button style={{ backgroundColor: "#34A34F" }}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={{ backgroundColor: "#3B5998" }}>
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: "#DD5144" }}>
            <Icon name="mail" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default HomeScreen;
