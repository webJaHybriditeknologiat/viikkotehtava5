import Map from './screens/Map';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState({
    latitude: 65.0600,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);

  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Geolocation failed");
      return;
    }

    try {
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // omana lisäyksenä ilmoitus sijainnin onnistuneesta päivityksestä
      Alert.alert("Location retrieved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  const addMarker = (coordinate) => {
    setMarkers([...markers, coordinate]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map location={location} markers={markers} addMarker={addMarker} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
