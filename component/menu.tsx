import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Clipboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';


export default function Menu() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  // Ici nous recuperons toutes les informations grace au userId
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(token => {
        AsyncStorage.getItem('userId')
          .then(userId => {
            axios.get(`http://192.168.1.6:3005/api/user/users/${userId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(response => {
                setNom(response.data.nom);
                setEmail(response.data.email);
                setPrenom(response.data.prenom);
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, []);

 

 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        
         
          <View>
            <Text style={styles.profileName}>{prenom}</Text>
            <Text style={styles.profileAddress}>
              
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.section}>
            
            <TouchableOpacity
              
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon color="#fff" name="user" size={20} />
              </View>
              <Text style={styles.rowLabel}>Nom & Prénom(s)</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="mail"
                  size={20} />
              </View>
              <Text style={styles.rowLabel}>Email</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={ ()=> navigation.navigate('welcome')}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="log-out"
                  size={20} />
              </View>
              <Text style={styles.rowLabel}>Déconnexion</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
           
            <TouchableOpacity
             onPress={() => navigation.navigate("services")}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="calendar"
                  size={20} />
              </View>
              <Text style={styles.rowLabel}>Réserver</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            
            <TouchableOpacity
             onPress={() => navigation.navigate("contact")}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="phone"
                  size={20} />
              </View>
              <Text style={styles.rowLabel}>Contacter Artiste</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            
            <TouchableOpacity
             onPress={() => navigation.navigate("location")}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="truck"
                  size={20} />
              </View>
              <Text style={styles.rowLabel}>Location Matériel</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            
            <TouchableOpacity
             onPress={() => navigation.navigate("reservation")}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="credit-card"
                  size={20} />
              </View>
              <Text style={styles.rowLabel}>Acheter un ticket</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <TouchableOpacity
             
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="info"
                  size={20} />
              </View>
              <Text style={styles.rowLabel}>À propos</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

