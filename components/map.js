import React from "react";
import { MapView } from "expo";
import { observer } from "mobx-react";
import { Constants, Location, Permissions } from "expo";
import { Thumbnail, Text, View } from "native-base";
import StyleSheet from "react-native";

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};

@observer
export default class Map extends React.Component {
  constructor() {
    super();

    this.state = {
      coordinate: null,
      location: { coords: { latitude: 0, longitude: 0 } }
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
    try {
      this.setState({ coordinate: null });
    } catch (e) {}

    // Crying both internally and externally
    this.forceUpdate();
  }

  locationChanged = location => {
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    try {
      this.setState({ location, region });
    } catch (e) {}
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    }
  }

  render() {
    const { store } = this.props;

    return (
      <MapView
        onPress={e => this.onMapPress(e)}
        style={{ width: "100%", height: "100%" }}
        region={this.state.region}
        showsUserLocation={true}
        rotateEnabled={false}
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
              >
                <MapView.Callout
                  tooltip
                  onPress={() => {
                    console.log("Clicked on callout");
                    store.loadComments(post);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 12,
                      padding: 12,
                      borderColor: "#666",
                      borderWidth: 1
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Thumbnail small source={{ uri: post.picUrl }} />
                      <Text
                        style={{
                          fontWeight: "bold",
                          marginTop: 8,
                          paddingLeft: 4
                        }}
                      >
                        {post.title}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ padding: 4 }}>{post.content}</Text>
                      <Text style={{ fontSize: 11, padding: 4 }}>
                        by {post.user} on {new Date(post.date).toDateString()}
                      </Text>
                    </View>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
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
