import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Background from '@/component/background';
import {  useNavigation } from '@react-navigation/native';
//import { useRouter } from 'expo-router';



const Welcome = () => {

    const navigation = useNavigation();

    
    const navigateToRegister = () =>{
        navigation.navigate('register')
      }

    return (
        <View style={styles.container}>
            <Background>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30, // Ajouter un espace en bas de la page
    },
    button: {
        backgroundColor: 'rgba(255,165,0,0.3)', // Transparent
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Welcome;
