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

const Register = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [mdp, setMdp] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isRegistering, setIsRegistering] = React.useState(false); // State to track registration process

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !tel || !mdp || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (mdp !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    const data = {
      nom: nom,
      prenom: prenom,
      tel: tel,
      email: email,
      mdp: mdp,
    };

    setIsRegistering(true); // Set state to true when registration starts

    try {
      const response = await axios.post('https://live-pro.onrender.com/api/user/register', data);
      console.log(response.data);
      Alert.alert('Compte créé avec succès !');
      navigation.navigate('verify');
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 500) {
        Alert.alert('Email déjà utilisé.');
      } else {
        Alert.alert('Numéro déjà utilisé !');
      }
    } finally {
      setIsRegistering(false); // Set state to false after registration completes (success or error)
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('login');
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
              style={[styles.input, { width: '100%', marginBottom: height * 0.02 }]}
              placeholder="Nom"
              onChangeText={setNom}
              placeholderTextColor="#FFF"
              value={nom}
            />
            <TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.02 }]}
              placeholder="Prénom"
              onChangeText={setPrenom}
              placeholderTextColor="#FFF"
              value={prenom}
            />
            <TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.02 }]}
              placeholder="Email"
              onChangeText={setEmail}
              placeholderTextColor="#FFF"
              value={email}
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.02 }]}
              placeholder="Téléphone"
              onChangeText={setTel}
              placeholderTextColor="#FFF"
              value={tel}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.02 }]}
              placeholder="Mot de passe"
              onChangeText={setMdp}
              value={mdp}
              placeholderTextColor="#FFF"
              secureTextEntry
            />
            <TextInput
              style={[styles.input, { width: '100%', marginBottom: height * 0.02 }]}
              placeholder="Confirmer mot de passe"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholderTextColor="#FFF"
              secureTextEntry
            />
            <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleRegister} disabled={isRegistering}>
              {isRegistering ? (
                <ActivityIndicator size="small" color="orange" />
              ) : (
                <Text style={[styles.buttonText, { color: 'orange' }]}>S'inscrire</Text>
              )}
            </TouchableOpacity>
            
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Background>
  );
};

const styles = StyleSheet.create({
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

export default Register;
