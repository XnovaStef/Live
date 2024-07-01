import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewStyle from '@/constants/MapViewStyle.json';
import axios from 'axios';

type UserLocation = {
  latitude: number;
  longitude: number;
};

type Live = {
  _id: string;
  lieu: string;
  artiste: string;
  latitude: number;
  longitude: number;
  date_live: string;
  adresse: string;
  genre: string;
};

const Map = ({ filteredLives, onLiveSelect }) => {
  const [region, setRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [lives, setLives] = useState<Live[]>([]);

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

      // Fetch lives data from API
      axios.get('https://live-pro.onrender.com/api/live/liveLocation')
        .then(response => {
          setLives(response.data);
        })
        .catch(error => {
          console.error('Error fetching lives:', error);
        });
    };

    requestLocationPermission();
  }, []);

  const handleMarkerPress = (live) => {
    onLiveSelect(live);
  };

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
          {filteredLives.map(live => (
            <Marker
              key={live._id}
              coordinate={{ latitude: live.latitude, longitude: live.longitude }}
              title={live.lieu}
              description={`${live.artiste}\n${live.date_live}\n${live.adresse}`} // Description complète
              //onPress={() => handleMarkerPress(live)}
              
            />
          ))}
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
