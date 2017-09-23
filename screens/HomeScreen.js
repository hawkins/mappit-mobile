import React from "react";
import { Icon, View, Button } from "native-base";

// Project Imports
import Map from "../components/map";
import HomeBanner from "../components/HomeBanner";

const HomeScreen = ({ openDrawer, closeDrawer }) => (
  <View>
    <HomeBanner>
      <Button transparent onPress={openDrawer}>
        <Icon name="menu" style={{ color: "white" }} />
      </Button>
    </HomeBanner>
    <Map />
  </View>
);

export default HomeScreen;
