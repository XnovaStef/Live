import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './welcome';
import Register from './register';
import Login from './login';
import Forgot from './forgot';
import Home from './home';
import Reservation from './reservation';
import Services from './services';
import Contact from './contact';
import Localisation from './location';
import Verify from './verify';
import Paiement from './paiement';

//import { Stack } from "expo-router";

const Stack = createStackNavigator();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'welcome',
};

const Layout = () => {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="verify" component={Verify} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forgot" component={Forgot} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="reservation" component={Reservation} />
      <Stack.Screen name="paiement" component={Paiement} />
      <Stack.Screen name="services" component={Services} />
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen name="location" component={Localisation} />
    </Stack.Navigator>
  );
}


export default Layout;
