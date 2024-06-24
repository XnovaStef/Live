import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewStyle from '@/constants/MapViewStyle.json';

type UserLocation = {
  latitude: number;
  longitude: number;
};

const Map = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setUserLocation({ latitude, longitude });
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          style={styles.map}
          customMapStyle={MapViewStyle}
          region={region}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Votre position"
              description="Vous êtes ici"
            />
          )}
        </MapView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
