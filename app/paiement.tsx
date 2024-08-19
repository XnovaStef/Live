import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Background from '@/component/background';
import { Alert } from 'react-native';

const Paiement = ({ route }) => {
    const { lieu_live, date_live, heure_live, prix_reserv, prix_ticket, type, artiste } = route.params;

    const [place, setPlace] = useState('');
    const [message, setMessage] = useState('');
    const [idUser, setIdUser] = useState('');
    const [email, setEmail] = useState('');

    const [isPaying, setIsPaying] = useState(false);
    const [isReserving, setIsReserving] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('accessToken')
            .then(token => {
                AsyncStorage.getItem('userId')
                    .then(userId => {
                        setIdUser(userId);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, []);

    const pay = async () => {
        if (!email || !place) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        setIsPaying(true);
        try {
            const response = await axios.post('https://live-pro.onrender.com/api/user/pay', {
                email,
                lieu_live,
                heure_live,
                date_live,
                prix_ticket,
                place,
                type, 
                artiste
            });
            setMessage(response.data.message);
            Alert.alert("Succès", response.data.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Erreur lors de la requête';
            setMessage(errorMessage);
            Alert.alert("Erreur", errorMessage);
        } finally {
            setIsPaying(false);
        }
    };

    const reserv = async () => {
        if (!email || !place) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        setIsReserving(true);
        try {
            const response = await axios.post('https://live-pro.onrender.com/api/user/reserv', {
                email,
                lieu_live,
                heure_live,
                date_live,
                prix_reserv,
                place,
                type,
                artiste
            });
            setMessage(response.data.message);
            Alert.alert("Succès", response.data.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Erreur lors de la requête';
            setMessage(errorMessage);
            Alert.alert("Erreur", errorMessage);
        } finally {
            setIsReserving(false);
        }
    };

    return (
        <Background>
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>
                        <View style={styles.form}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}>
                                <View style={[styles.rowIcon, { backgroundColor: '#21764C' }]}>
                                    <FeatherIcon color="#fff" name='refresh-ccw' size={20} />
                                </View>
                                <Text style={styles.rowLabel}>Entrez votre email et confirmez votre demande pour recevoir votre code de validation</Text>
                                <View style={styles.rowSpacer} />
                            </TouchableOpacity>

                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    keyboardType="email-address"
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    placeholder='email'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Lieu</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    editable={false}
                                    value={lieu_live}
                                    placeholder='lieu'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Type</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    editable={false}
                                    value={type}
                                    placeholder='type'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>

                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Artiste</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    editable={false}
                                    value={artiste}
                                    placeholder='artiste'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Prix Ticket</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    editable={false}
                                    value={prix_ticket.toString()}
                                    keyboardType="numeric"
                                    placeholder='prix ticket'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Prix Réservation</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    editable={false}
                                    value={prix_reserv.toString()}
                                    keyboardType="numeric"
                                    placeholder='prix ticket'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Heure</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    editable={false}
                                    value={heure_live}
                                    placeholder='heure'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Date</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    editable={false}
                                    value={date_live}
                                    placeholder='date'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Nombre de places</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setPlace(text)}
                                    value={place}
                                    placeholder='Entrez le nombre de place'
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                />
                            </View>
                            <View style={styles.formAction}>
                                <TouchableOpacity onPress={pay} disabled={isPaying}>
                                    <View style={styles.btn}>
                                        {isPaying ? (
                                            <ActivityIndicator size="small" color="#FFF" />
                                        ) : (
                                            <Text style={styles.btnText}>Payer</Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.formAction}>
                                <TouchableOpacity onPress={reserv} disabled={isReserving}>
                                    <View style={styles.btn}>
                                        {isReserving ? (
                                            <ActivityIndicator size="small" color="#FFF" />
                                        ) : (
                                            <Text style={styles.btnText}>Réserver</Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
        </Background>
    );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(255,165,0,0.3)',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
},
paymentOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#21764C',
},
selectedPaymentButton: {
  backgroundColor: '#21764C', // Couleur de fond pour le bouton sélectionné
  borderColor: '#21764C',
},
paymentOptionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
},

paymentButton: {
  padding: 10,
  margin: 5,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ccc',
},

  /** Row */
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 150,
    backgroundColor: 'rgba(255,165,0,0.3)',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginTop: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#FFF',
    textAlign: 'center',
    margin: 10
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

export default Paiement;
