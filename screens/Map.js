import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";

export default function Map(props) {
  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    props.addMarker(coords);
  };

  return (
    <MapView
      style={styles.map}
      region={props.location}
      mapType="standard"
      onLongPress={showMarker}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
