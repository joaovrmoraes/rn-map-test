import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (!granted) {
      setErrorMsg("Permission to access location was denied");
    }

    if (granted) {
      const location = await getCurrentPositionAsync();
      setLocation(location);

      console.log(location);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="Here I am"
          />
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    flex: 1,
    width: "100%",
  },
});
