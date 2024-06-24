import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, ScrollView } from 'react-native';
import Carousel from '@/component/caroussel';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ArtisteBox from '@/component/artisteBox';

const windowWidth = Dimensions.get('screen').width;

const Reservation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const concerts = [
        {
            lieu: "Salle de concert fictive",
            date: "01/01/2023",
            heure: "20:00",
            prix: "50€",
        },
        {
            lieu: "Théâtre Imaginaire",
            date: "05/02/2023",
            heure: "18:00",
            prix: "40€",
        }
    ];

    const artistes = [
        { label: "Damso", image: require('@/app/assets/damso1.jpg'), concerts: concerts },
        { label: "Maes", image: require('@/app/assets/maes.jpg'),  concerts: concerts },
        { label: "Booba", image: require('@/app/assets/booba.jpg'), concerts: concerts },
        { label: "Orelsan", image: require('@/app/assets/orelsan.jpg'), concerts: concerts },
    ];
    
    const filteredArtistes = artistes.filter(artiste =>
        artiste.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openPopup = () => {
        // Code pour ouvrir le popup
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Carousel />
            </View>
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
                        <ArtisteBox
                            key={artiste.label}
                            artisteLabel={artiste.label}
                            artisteImage={artiste.image}
                            onPress={openPopup}
                            concerts={artiste.concerts}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    rectangle: {
        top: '5%',
        width: '95%',
        height: '30%',
        transform: [{ rotate: '360deg' }],
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 2,
        shadowOffset: {
            width: 2,
            height: 2
        }
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
})

export default Reservation;
