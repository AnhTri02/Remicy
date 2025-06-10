// app/NearestATMs.js
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function NearestATMs() {
  const [location, setLocation] = useState(null);
  const [atms, setATMs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

        const query = `
          [out:json];
          node["amenity"="atm"](around:10000,${loc.coords.latitude},${loc.coords.longitude});
          out body;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `data=${encodeURIComponent(query)}`,
        });

        const data = await response.json();
        console.log('ATM data:', data.elements); // Debug-logg
        const filtered = (data.elements || []).filter(e => e.lat && e.lon);
        setATMs(filtered);
      } catch (error) {
        console.error(error);
        setErrorMsg('Failed to fetch ATM data');
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'white' }}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: 'white', marginTop: 10 }}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation
    >
      {atms.map((atm) => (
        <Marker
          key={atm.id}
          coordinate={{ latitude: atm.lat, longitude: atm.lon }}
          title="ATM HERE!!!"
          description="Bankomat bitch"
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
