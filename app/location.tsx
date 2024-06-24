import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import Carousel from '@/component/caroussel';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('screen').width;

interface Article {
    id: number;
    image: any;
    name: string;
    price: string;
    description: string;
}

const Localisation = () => {
    const [articleQuantities, setArticleQuantities] = useState<{ [key: number]: number }>({});
    const [isApproved, setIsApproved] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [cartVisible, setCartVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleIncrement = (articleId: number) => {
        setArticleQuantities(prevQuantities => ({
            ...prevQuantities,
            [articleId]: (prevQuantities[articleId] || 0) + 1
        }));
    };

    const handleDecrement = (articleId: number) => {
        setArticleQuantities(prevQuantities => ({
            ...prevQuantities,
            [articleId]: Math.max((prevQuantities[articleId] || 0) - 1, 0)
        }));
    };

    const handleRent = () => {
        setIsApproved(true);
        setTimeout(() => setIsApproved(false), 1000);
    };

    const handleShowDetails = (article: Article) => {
        setSelectedArticle(article);
        setModalVisible(true);
    };

    const handleAddToCart = () => {
        setModalVisible(false);
    };

    const articles: Article[] = [
        { id: 1, image: require('@/app/assets/carousel1.jpg'), name: 'Article 1', price: '10$', description: 'Description 1' },
        { id: 2, image: require('@/app/assets/carousel2.jpg'), name: 'Article 2', price: '20$', description: 'Description 2' },
        { id: 3, image: require('@/app/assets/carousel3.jpg'), name: 'Article 3', price: '30$', description: 'Description 3' },
        { id: 4, image: require('@/app/assets/carousel1.jpg'), name: 'Article 4', price: '40$', description: 'Description 4' },
        { id: 5, image: require('@/app/assets/carousel2.jpg'), name: 'Article 5', price: '50$', description: 'Description 5' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
            <View style={styles.rectangle}>
                <Carousel />
            </View>
            <ScrollView style={styles.articlesContainer}>
                {articles.map(article => (
                    <View key={article.id} style={styles.article}>
                        <Image source={article.image} style={styles.articleImage} />
                        <View style={styles.quantityButtons}>
                            <TouchableOpacity style={styles.button} onPress={() => handleDecrement(article.id)}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{articleQuantities[article.id] || 0}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => handleIncrement(article.id)}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => handleShowDetails(article)}>
                            <Text style={styles.detailsButtonText}>Voir Détail</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.rentButton} onPress={() => setCartVisible(true)}>
                <Ionicons name="cart" size={30} color="white" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.articleName}>{selectedArticle?.name}</Text>
                        <Text style={styles.articlePrice}>{selectedArticle?.price}</Text>
                        <Text style={styles.articleDescription}>{selectedArticle?.description}</Text>
                        <Text style={styles.articleQuantity}>Quantité: {articleQuantities[selectedArticle?.id || 0] || 0}</Text>
                        <View style={styles.datePickerContainer}>
                            <Text>Date de début:</Text>
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={(event, date) => date && setStartDate(date)}
                            />
                        </View>
                        <View style={styles.datePickerContainer}>
                            <Text>Date de fin:</Text>
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={(event, date) => date && setEndDate(date)}
                            />
                        </View>
                        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                            <Text style={styles.addToCartButtonText}>Ajouter au Panier</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={cartVisible}
                onRequestClose={() => setCartVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => setCartVisible(false)}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.cartTitle}>Votre Panier</Text>
                        <View style={styles.cartItemsContainer}>
                            {Object.entries(articleQuantities).map(([id, quantity]) => {
                                const article = articles.find(article => article.id === parseInt(id));
                                if (article && quantity > 0) {
                                    return (
                                        <View key={article.id} style={styles.cartItem}>
                                            <Image source={article.image} style={styles.cartItemImage} />
                                            <View style={styles.cartItemDetails}>
                                                <Text style={styles.cartItemName}>{article.name}</Text>
                                                <Text style={styles.cartItemQuantity}>Quantité: {quantity}</Text>
                                                <Text style={styles.cartItemPrice}>{article.price}</Text>
                                            </View>
                                        </View>
                                    );
                                }
                                return null;
                            })}
                        </View>
                        <TouchableOpacity style={styles.rentButton} onPress={handleRent}>
                        <Text style={styles.rentButtonText}>{isApproved ? '✓' : 'Louer'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        top: -20,
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
    articlesContainer: {
        flex: 1,
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
    article: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    quantityButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    articleImage: {
        width: 80,
        height: 80,
        marginRight: 20,
        borderRadius: 10,
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailsButton: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    detailsButtonText: {
        color: 'white',
        fontSize: 14,
    },
    rentButton: {
        marginTop: 20,
        marginBottom: 15,
        width: '60%',
        alignSelf: 'center',
        backgroundColor: 'pink',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    rentButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartButton: {
        position: 'absolute',
        top: 5,
        right: 20,
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 25,
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
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    articleName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    articlePrice: {
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
    },
    articleDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    articleQuantity: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    datePickerContainer: {
        width: '100%',
        marginBottom: 20,
    },
    addToCartButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 14,
    },
    cartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItemsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        marginRight: 20,
        borderRadius: 10,
    },
    cartItemDetails: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItemQuantity: {
        fontSize: 16,
    },
    cartItemPrice: {
        fontSize: 16,
        color: 'green',
    },
});

export default Localisation;
