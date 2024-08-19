import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Dimensions, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import Background from '@/component/background';

const windowWidth = Dimensions.get('screen').width;

const Reservation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [artistes, setArtistes] = useState([]);
    const navigation = useNavigation();

    const staticImages = [
        require('@/app/assets/Yodé.jpg'),
        require('@/app/assets/fally.jpg'),
        require('@/app/assets/koffi.jpg'),
        require('@/app/assets/VDA.jpg'),
    ];

    useEffect(() => {
        fetch('https://live-pro.onrender.com/api/live/liveLocation')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.map((item) => {
                    const concert = {
                        lieu: item.lieu,
                        date: item.date_live,
                        heure: item.heure_live,
                        types: item.tickets.map(ticket => ticket.type),
                        prix_tickets: item.tickets.map(ticket => ticket.prix_ticket),
                        prix_reservs: item.tickets.map(ticket => ticket.prix_reserv),
                        artiste: item.artiste,
                        isPast: new Date(item.date_live) < new Date(), // Vérification de la date
                    };

                    return {
                        label: item.artiste,
                        image: staticImages[data.indexOf(item) % staticImages.length],
                        concert: concert
                    };
                });

                setArtistes(formattedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredArtistes = artistes.filter(artiste =>
        artiste.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTicketClick = (concertDetails, index) => {
        if (!concertDetails.isPast) { // Ne pas permettre l'action si la date est passée
            navigation.navigate('paiement', {
                lieu_live: concertDetails.lieu,
                date_live: concertDetails.date,
                heure_live: concertDetails.heure,
                prix_reserv: concertDetails.prix_reservs[index],
                prix_ticket: concertDetails.prix_tickets[index],
                type: concertDetails.types[index],
                artiste: concertDetails.artiste,
            });
        }
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
                                <View style={styles.concertInfo}>
                                    <Text style={styles.infoTitle}>Lieu: <Text style={styles.info}>{artiste.concert.lieu}</Text></Text>
                                    <Text style={styles.infoTitle}>Date: <Text style={styles.info}>{artiste.concert.date}</Text></Text>
                                    <Text style={styles.infoTitle}>Heure: <Text style={styles.info}>{artiste.concert.heure}</Text></Text>
                                    <View style={styles.buttonContainer}>
                                        {artiste.concert.types.map((type, index) => (
                                            <TouchableOpacity 
                                                key={index} 
                                                style={[
                                                    styles.ticketButton, 
                                                    artiste.concert.isPast && styles.disabledButton
                                                ]}
                                                onPress={() => handleTicketClick(artiste.concert, index)}
                                                disabled={artiste.concert.isPast} // Désactiver les boutons si la date est passée
                                            >
                                                <Text style={[
                                                    styles.buttonText, 
                                                    artiste.concert.isPast && styles.disabledButtonText
                                                ]}>
                                                    {type}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
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
        zIndex: 1,
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
        color: '#FF6347',
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
        borderColor: '#FF6347',
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
        borderColor: '#FF6347',
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
        color: '#FF6347',
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
    buttonContainer: {
        marginTop: 10,
    },
    ticketButton: {
        backgroundColor: 'rgba(255,165,0,0.3)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    disabledButton: {
        backgroundColor: 'grey',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    disabledButtonText: {
        color: '#ccc',
    },
});

export default Reservation;
