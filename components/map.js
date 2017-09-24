import React from "react";
import { MapView } from "expo";
import { observer } from "mobx-react";

@observer
export default class Map extends React.Component {
  constructor() {
    super();

    this.state = {
      coordinate: null
    };
  }

  onMapPress(e) {
    if (!this.props.store.addingPin) return;

    this.props.store.newPinCoordinate = e.nativeEvent.coordinate;
    this.state.coordinate = e.nativeEvent.coordinate;

    // Crying both internally and externally
    this.forceUpdate();

    // TODO: Submit the pin
    this.props.store.addingPin = false;
  }

  render() {
    const { store } = this.props;

    return (
      <MapView
        onPress={e => this.onMapPress(e)}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 32.3361938,
          longitude: -90.1748317,
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
        {!this.state.coordinate ? null : (
          <MapView.Marker
            key={store.newPinTitle}
            coordinate={this.state.coordinate}
            title={store.newPinTitle}
            description={store.newPinContent}
          />
        )}
      </MapView>
    );
  }
}
