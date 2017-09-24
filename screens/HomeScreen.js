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
        <HomeBanner store={store}>
          <Button transparent onPress={openDrawer}>
            <Icon name="menu" style={{ color: "white" }} />
          </Button>
        </HomeBanner>

        <Container>
          <Map store={store} />
        </Container>

        <Fab
          active={this.state.active}
          direction="up"
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="md-add" />
          <Button
            onPress={() => {
              store.addingPin = !store.addingPin;
              console.log("Adding pin:", store.addingPin);

              store.screen = "post";
            }}
            style={{ backgroundColor: "#34A34F" }}
          >
            <Icon name="ios-pin" style={{ width: 13 }} />
          </Button>
          <Button style={{ backgroundColor: "#DD5144" }}>
            <Icon name="ios-list" style={{ width: 13 }} />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default HomeScreen;
