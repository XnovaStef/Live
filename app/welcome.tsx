import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Background from '@/component/background';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    const navigateToRegister = () => {
        navigation.navigate('register');
    };

    const navigateToLogin = () => {
        navigation.navigate('login');
    };

    return (
        <View style={styles.container}>
            <Background>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'rgba(255,165,0,0.3)', // Transparent
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 20, // Espacement entre les boutons
        width: '80%', // Largeur fixe des boutons
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Centrer le texte
    },
});

export default Welcome;
