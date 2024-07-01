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

const Verify = () => {
    const { width, height } = Dimensions.get('window');

    const [code, setCode] = React.useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    

    const handleForgotPassword = async () => {
      if (!code) {
        Alert.alert('Veuillez entrer le code de vérification.');
        return;
      }
  
      const data = {
        code: code
      };
  
      try {
        const response = await axios.post('https://live-pro.onrender.com/api/user/verify', data);
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
              placeholder="Code vérification"
              onChangeText={setCode}
              placeholderTextColor='#FFF'
              value={code}
              keyboardType="numeric"
            />
            
            <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleForgotPassword}>
              <Text style={[styles.buttonText, { color: 'orange' }]}>Vérifier</Text>
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

export default Verify;
