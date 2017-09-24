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

    this.props.store.newPostCoordinate = e.nativeEvent.coordinate;
    this.state.coordinate = e.nativeEvent.coordinate;

    // Submit the pin
    this.props.store.addingPin = false;
    this.props.store.createPin();

    // Reset state
    this.setState({ coordinate: null });

    // Crying both internally and externally
    this.forceUpdate();
  }

  render() {
    const { store } = this.props;

    return (
      <MapView
        onPress={e => this.onMapPress(e)}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 33.454805,
          longitude: -88.79003,
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
            key={store.newPostTitle}
            coordinate={this.state.coordinate}
            title={store.newPostTitle}
            description={store.newPostContent}
          />
        )}
      </MapView>
    );
  }
}
