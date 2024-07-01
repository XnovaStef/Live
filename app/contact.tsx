import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator, Linking } from 'react-native';
import Carousel from '@/component/caroussel';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

interface Artiste {
    artiste: String;
    id: String;
    image: any;
    name: string;
    price: string;
    contact: string;
}

const Contact = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Artiste | null>(null);
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState<Artiste[]>([]);

    const staticImages = [
        require('@/app/assets/damso1.jpg'),
        require('@/app/assets/damso1.jpg'),
        require('@/app/assets/carousel3.jpg'),
        require('@/app/assets/booba.jpg'),
        require('@/app/assets/carousel2.jpg'),
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://live-pro.onrender.com/api/live/liveLocation'); // Replace with your API endpoint
                const lives = response.data;

                // Transform the data to fit the Artiste interface and add static images
                const transformedArticles = lives.map((live: any, index: number) => ({
                    id: live._id,
                    image: staticImages[index % staticImages.length], // Cycle through static images
                    name: live.artiste,
                    price: live.prix_ticket,
                    contact: live.contact_artiste,
                }));

                setArticles(transformedArticles);
            } catch (error) {
                console.error('Error fetching data from API', error);
            }
        };

        fetchData();
    }, []);

    const handleShowDetails = (artiste: Artiste) => {
        setSelectedArticle(artiste);
        setModalVisible(true);
    };

    const handleMiseEnRelation = (contact: string) => {
        const phoneUrl = `tel:${contact}`;
        Linking.canOpenURL(phoneUrl)
            .then(supported => {
                if (supported) {
                    Linking.openURL(phoneUrl);
                } else {
                    console.error('Error opening the URL', phoneUrl);
                }
            })
            .catch(err => console.error('An error occurred', err));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
            <View style={styles.rectangle}>
                <Carousel />
            </View>
            <ScrollView style={styles.articlesContainer}>
                {articles.map(artiste => (
                    <View key={artiste.id} style={styles.artiste}>
                        <Image source={artiste.image} style={styles.articleImage} />
                        <View style={styles.articleInfo}>
                            <Text style={styles.articleName}>{artiste.name}</Text>
                            <TouchableOpacity style={styles.detailsButton} onPress={() => handleShowDetails(artiste)}>
                                <FontAwesome name="phone" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            {selectedArticle && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
                                <FontAwesome name="times" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalArticleName}>{selectedArticle.name}</Text>
                            <Text style={styles.articlePrice}>{selectedArticle.price} FCFA</Text>
                            <TouchableOpacity style={styles.miseEnRelationButton} onPress={() => handleMiseEnRelation(selectedArticle.contact)}>
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.miseEnRelationButtonText}>Mise en relation</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    rectangle: {
        top: "5%",
        width: '95%',
        height: '20%',
        transform: [{ rotate: '360deg' }],
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 2,
        shadowOffset: {
            width: 2,
            height: 2
        },
        marginBottom:10
    },
    articlesContainer: {
        top:'10%',
        flex: 6,
        width: '95%',
        height: 200,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    artiste: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    articleImage: {
        width: 80,
        height: 80,
        marginRight: 20,
        borderRadius: 10,
    },
    articleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    articleName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    detailsButton: {
        padding: 10,
        backgroundColor: 'pink',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalArticleName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    articlePrice: {
        fontSize: 20,
        color: 'green',
        marginBottom: 20,
    },
    miseEnRelationButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        marginBottom: 20,
    },
    miseEnRelationButtonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 14,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default Contact;
