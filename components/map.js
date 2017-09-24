import React from "react";
import { MapView } from "expo";
import { observer } from "mobx-react";

@observer
export default class Map extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 33.4552,
          longitude: -88.7944,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {!store.currentTopology
          ? null
          : store.currentTopology.posts.map(post => (
              <MapView.Marker
                key={post.title}
                coordinate={{
                  latitude: post.mapData.lat,
                  longitude: post.mapData.lon
                }}
                title={post.title}
                description={post.content}
              />
            ))}
      </MapView>
    );
  }
}
