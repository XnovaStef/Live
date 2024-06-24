import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Dimensions, View, StatusBar, ScrollView, TextInput } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ServiceBox from '@/component/serviceBox'; // Modify the path according to your folder structure
import { useRouter } from 'expo-router';
import ScrollingLogos from '@/component/logoScrolling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const windowWidth = Dimensions.get('screen').width;

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('Access Token:', token); // Vérifiez le token récupéré
        if (token) {
          const userId = await AsyncStorage.getItem('userId');
          console.log('User ID:', userId); // Vérifiez l'ID utilisateur récupéré
          if (userId) {
            try {
              const response = await axios.get(`http://192.168.1.17:3005/api/user/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setNom(response.data.nom);
              setPrenom(response.data.prenom);
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          } else {
            console.error('User ID not found in AsyncStorage');
          }
        } else {
          console.error('Access Token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    getUserInfo();
  }, []);

  const services = [
    { label: "Location",  action: () => router.push("location") },
    { label: "Reservation", action: () => router.push("reservation") },
  ];

  const filteredServices = services.filter(service =>
    service.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
        <View style={styles.header}>
          <Text style={styles.title}>
            Bienvenue <Text style={styles.highlight}>{prenom}</Text>
          </Text>
          <Text style={styles.subtitle}>
            Quel est votre besoin ?
          </Text>
        </View>
        <View style={styles.search}>
          <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
            <Icon name="find-replace" style={styles.icon} />
            <TextInput
              placeholder="Rechercher un service"
              style={[styles.input, isFocused && styles.inputFocused]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholderTextColor="#888"
            />
          </View>
        </View>
        <View style={{ width: '100%', height: '5%' }}></View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.serviceRow}>
            {filteredServices.map(service => (
              <ServiceBox
                key={service.label}
                serviceLabel={service.label}
                //serviceImage={service.image}
                onPress={service.action} 
                serviceImage={0}
              />
            ))}
          </View>
        </ScrollView>
        <View style={{ width: '100%', height: Math.min(windowWidth * 0.40) }}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  highlight: {
    color: '#FF6347', // Vibrant color for highlighting
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '80%',
    backgroundColor: '#FFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  inputContainerFocused: {
    borderColor: '#FF6347', // Border color when focused
  },
  icon: {
    marginRight: 10,
    color: '#FF6347',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  inputFocused: {
    borderColor: '#FF6347', // Text color when focused
  },
  search: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  serviceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default Services;
