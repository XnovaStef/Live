import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
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

type MapProps = {
  filteredLives: Live[];
  onLiveSelect: (live: Live) => void;
};

const Map: React.FC<MapProps> = ({ filteredLives, onLiveSelect }) => {
  const [region, setRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedLive, setSelectedLive] = useState<Live | null>(null);
  const [lives, setLives] = useState<Live[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission refusée', 'La permission d\'accéder à la localisation a été refusée.');
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
        const response = await axios.get('https://live-pro.onrender.com/api/live/liveLocation');
        setLives(response.data);
      } catch (error) {
        console.error('Error fetching lives:', error);
        setError('Erreur lors de la récupération des événements.');
      }
    };

    requestLocationPermission();
  }, []);

  const handleMarkerPress = (live: Live) => {
    setSelectedLive(live);
    onLiveSelect(live);
  };

  // Function to get the part of the address before the first comma
  const getAddressPart = (address: string) => {
    return address.split(',')[0];
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
              onPress={() => handleMarkerPress(live)}
            >
              <Image
                source={require('@/app/assets/location.png')}
                style={styles.markerImage}
              />
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{live.lieu}</Text>
                  <Text style={styles.items}>{live.artiste}</Text>
                  <Text style={styles.items}>{live.date_live}</Text>
                  <Text style={styles.items}>{getAddressPart(live.adresse)}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : null}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
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
  markerImage: {
    width: 30,
    height: 30,
  },
  calloutContainer: {
    width: 150,
    padding: 10,
    backgroundColor: '#000',
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#FFF",
  },
  items: {
    color: '#FFF',
  },
  errorContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFDDDD',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#D9534F',
  },
});

export default Map;
