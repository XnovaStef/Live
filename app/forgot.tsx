import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
  } from 'react-native';
import Background from '@/component/background';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';

const Forgot = () => {
    const { width, height } = Dimensions.get('window');

    const [newPassword, setNewPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    

    const handleForgotPassword = async () => {
      if (!email || !newPassword) {
        Alert.alert('Veuillez remplir tous les champs.');
        return;
      }
  
      const data = {
        email: email,
        newPassword: newPassword,
      };
  
      try {
        const response = await axios.post('http://192.168.1.17:3005/api/user/forgot', data);
        setMessage(response.data.message);
        Alert.alert("Succès", response.data.message);
        navigation.navigate('login');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erreur lors de la requête';
        setMessage(errorMessage);
        Alert.alert("Erreur", errorMessage);
    }
    };

     return (
    <Background>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={[styles.form, { width: width * 0.8 }]}>
            <TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.03 }]}
              placeholder="Email"
              onChangeText={setEmail}
              placeholderTextColor='#FFF'
              value={email}
              keyboardType="email-address"
            />

<TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.03 }]}
              placeholder="Nouveau mot de passe"
              onChangeText={setNewPassword}
              placeholderTextColor='#FFF'
              value={newPassword}
              keyboardType="email-address"
            />
            
            <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleForgotPassword}>
              <Text style={[styles.buttonText, { color: 'orange' }]}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Background>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '80%',
    marginBottom: 20,
  },
  form: {
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingLeft: 10,
    color: "#FFF"
  },
  button: {
    height: 50,
    backgroundColor: 'rgba(255,165,0,0.3)', // Transparent with a tint of orange
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Forgot;
