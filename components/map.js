import React from "react";
import { MapView } from "expo";

export default class Map extends React.Component {
  render() {
    return (
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 33.4552,
          longitude: -88.7944,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}
