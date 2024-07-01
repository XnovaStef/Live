import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Dimensions, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Carousel from '@/component/caroussel';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import Background from '@/component/background';

const windowWidth = Dimensions.get('screen').width;

const Reservation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [artistes, setArtistes] = useState([]);
    const navigation = useNavigation();

    const artisteImages = {
        Damso: require('@/app/assets/damso1.jpg'),
        Maes: require('@/app/assets/maes.jpg'),
        Booba: require('@/app/assets/booba.jpg'),
        Orelsan: require('@/app/assets/orelsan.jpg'),
    };

    useEffect(() => {
        fetch('https://live-pro.onrender.com/api/live/liveLocation')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.reduce((acc, live) => {
                    const existingArtiste = acc.find(artiste => artiste.label === live.artiste);
                    if (existingArtiste) {
                        existingArtiste.concerts.push({
                            lieu: live.lieu,
                            date: live.date_live,
                            heure: live.heure_live,
                            prix_ticket: live.prix_ticket,
                            prix_reserv: live.prix_reserv
                        });
                    } else {
                        acc.push({
                            label: live.artiste,
                            image: artisteImages[live.artiste],
                            concerts: [{
                                lieu: live.lieu,
                                date: live.date_live,
                                heure: live.heure_live,
                                prix_ticket: live.prix_ticket,
                                prix_reserv: live.prix_reserv
                            }]
                        });
                    }
                    return acc;
                }, []);
                setArtistes(formattedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredArtistes = artistes.filter(artiste =>
        artiste.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePayment = (concertDetails) => {
        navigation.navigate('paiement', {
            lieu_live: concertDetails.lieu,
            date_live: concertDetails.date,
            heure_live: concertDetails.heure,
            prix_reserv: concertDetails.prix_reserv,
            prix_ticket: concertDetails.prix_ticket,
        });
    };

    return (
        <Background>
            <View style={styles.container}>
                
                <View style={styles.search}>
                    <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
                        <Icon name="find-replace" style={styles.icon} />
                        <TextInput
                            placeholder="Rechercher artiste"
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
                        {filteredArtistes.map(artiste => (
                            <View key={artiste.label} style={styles.artisteBox}>
                                <Image source={artiste.image} style={styles.image} />
                                <Text style={styles.label}>{artiste.label}</Text>
                                {artiste.concerts.map((concert, index) => (
                                    <View key={index} style={styles.concertInfo}>
                                        <Text style={styles.infoTitle}>Lieu: <Text style={styles.info}>{concert.lieu}</Text></Text>
                                        <Text style={styles.infoTitle}>Date: <Text style={styles.info}>{concert.date}</Text></Text>
                                        <Text style={styles.infoTitle}>Heure: <Text style={styles.info}>{concert.heure}</Text></Text>
                                        <Text style={styles.infoTitle}>Prix Ticket: <Text style={styles.info}>{concert.prix_ticket} FCFA</Text></Text>
                                        <Text style={styles.infoTitle}>Prix Reservation: <Text style={styles.info}>{concert.prix_reserv} FCFA</Text></Text>
                                    </View>
                                ))}
                                {artiste.concerts.map((concert, index) => (
                                    <TouchableOpacity key={index} onPress={() => handlePayment(concert)} style={styles.button}>
                                        <Text style={styles.buttonText}>Paiement</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
    },
    rectangle: {
        width: '95%',
        height: '30%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        backgroundColor: '#fff',
        zIndex: 1, // Ajout de zIndex pour s'assurer qu'il est au-dessus
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
    artisteBox: {
        width: '45%',
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color:'#FF6347'
    },
    concertInfo: {
        marginTop: 10,
        width: '100%',
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    info: {
        fontWeight: 'normal',
        color: '#FFF',
    },
    button: {
        marginTop: 10,
        backgroundColor: 'rgba(255,165,0,0.3)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Reservation;
