import React from 'react';
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
  Alert,
  ActivityIndicator,
} from 'react-native';
import Background from '@/component/background';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [mdp, setMdp] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); // State to track loading state

  const handleLogin = async () => {
    if (!email || !mdp) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true); // Set loading state to true when login starts

    try {
      const data = {
        email: email,
        mdp: mdp,
      };

      const response = await axios.post('https://live-pro.onrender.com/api/user/login', data);
      console.log('API Response:', response.data); // Log the entire response

      const { token, userId } = response.data;

      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('userId', userId);

      console.log('Access Token:', token);
      console.log('User ID:', userId);

      navigation.navigate('home');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        Alert.alert('Numéro ou mot de passe incorrect');
      } else {
        Alert.alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    } finally {
      setIsLoading(false); // Set loading state to false after login completes (success or error)
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('forgot');
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
              placeholderTextColor="#FFF"
              value={email}
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.03 }]}
              placeholder="Mot de passe"
              onChangeText={setMdp}
              value={mdp}
              placeholderTextColor="#FFF"
              secureTextEntry
            />
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={{ color: '#FFF', textDecorationLine: 'underline', marginBottom: height * 0.03 }}>
                Mot de passe oublié
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { width: '100%' }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="orange" />
              ) : (
                <Text style={[styles.buttonText, { color: 'orange' }]}>Se connecter</Text>
              )}
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
    color: '#FFF',
  },
  button: {
    height: 50,
    backgroundColor: 'rgba(255, 165, 0, 0.3)', // Transparent with a tint of orange
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Login;
