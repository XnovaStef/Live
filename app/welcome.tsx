import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Background from '@/component/background';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('home'); // Remplacez 'login' par la page que vous souhaitez afficher après la splash screen
        }, 3000); // 3 secondes

        return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Background>
                <View style={styles.content}>
                    <Text style={styles.splashText}>Bienvenue</Text>
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
    splashText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Welcome;
