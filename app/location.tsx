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
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

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

    const getTotalCartItems = () => {
        return Object.values(articleQuantities).reduce((total, quantity) => total + quantity, 0);
    };

    const articles: Article[] = [
        { id: 1, image: require('@/app/assets/podium.jpg'), name: 'Podium', price: '15000 FCFA', description: 'Description 1' },
        { id: 2, image: require('@/app/assets/ecran.jpg'), name: 'Ecran géant', price: '2000 FCFA', description: 'Description 2' },
        { id: 3, image: require('@/app/assets/carousel3.jpg'), name: 'Orchestre', price: '10000 FCFA', description: 'Description 3' },
        { id: 4, image: require('@/app/assets/sono.jpg'), name: 'Sono', price: '5000 FCFA', description: 'Description 4' },
        { id: 5, image: require('@/app/assets/chaise.jpg'), name: 'Chaise', price: '15000 FCFA', description: 'Description 5' },
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
                        <Text style={styles.articleName}>{article.name}</Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => handleShowDetails(article)}>
                            <Text style={styles.detailsButtonText}>Voir Détail</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.cartButton} onPress={() => setCartVisible(true)}>
                <Ionicons name="cart" size={30} color="white" />
                {getTotalCartItems() > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{getTotalCartItems()}</Text>
                    </View>
                )}
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
                        <View style={styles.quantityButtons}>
                            <TouchableOpacity style={styles.button} onPress={() => handleDecrement(selectedArticle?.id || 0)}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{articleQuantities[selectedArticle?.id || 0] || 0}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => handleIncrement(selectedArticle?.id || 0)}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.datePickerContainer}>
                            <Text>Date de début:</Text>
                            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                                <Text style={styles.datePickerText}>{startDate.toDateString()}</Text>
                            </TouchableOpacity>
                            {showStartPicker && (
                                <DateTimePicker
                                    value={startDate}
                                    mode="date"
                                    display="default"
                                    onChange={(event, date) => {
                                        setShowStartPicker(false);
                                        date && setStartDate(date);
                                    }}
                                />
                            )}
                        </View>
                        <View style={styles.datePickerContainer}>
                            <Text>Date de fin:</Text>
                            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                                <Text style={styles.datePickerText}>{endDate.toDateString()}</Text>
                            </TouchableOpacity>
                            {showEndPicker && (
                                <DateTimePicker
                                    value={endDate}
                                    mode="date"
                                    display="default"
                                    onChange={(event, date) => {
                                        setShowEndPicker(false);
                                        date && setEndDate(date);
                                    }}
                                />
                            )}
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
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
        backgroundColor: '#fff',
    },
    articlesContainer: {
        width: '95%',
        marginTop: 20,
    },
    article: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
        alignItems: 'center',
    },
    articleImage: {
        width: windowWidth * 0.8,
        height: 150,
        borderRadius: 10,
    },
    articleName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    detailsButton: {
        marginTop: 10,
        backgroundColor: 'rgba(255,165,0,0.3)',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    detailsButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cartButton: {
        position: 'absolute',
        bottom: 20, // Adjust the value as needed
        right: 20, // Adjust the value as needed
        backgroundColor: 'rgba(255,165,0,0.3)',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    articlePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    articleDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
    quantityButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,165,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    datePickerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    datePickerText: {
        color: 'rgba(255,165,0,0.3)',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    addToCartButton: {
        backgroundColor: 'rgba(255,165,0,0.3)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItemsContainer: {
        width: '100%',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    cartItemDetails: {
        marginLeft: 10,
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartItemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    cartItemPrice: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    rentButton: {
        backgroundColor: 'rgba(255,165,0,0.3)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    rentButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Localisation;

