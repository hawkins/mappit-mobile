import React from "react";
import { MapView } from "expo";
import { observer } from "mobx-react";
import { Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

@observer
export default class Map extends React.Component {
  constructor() {
    super();

    this.state = {
      coordinate: null,
      location: { coords: {latitude: 0, longitude: 0}},
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

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    this.setState({location, region})
  }

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  render() {
    const { store } = this.props;

    return (
      <MapView
        onPress={e => this.onMapPress(e)}
        style={{ width: "100%", height: "100%" }}
        region={this.state.region}
        showsUserLocation={true}
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
