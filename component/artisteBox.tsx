import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ImageSourcePropType, Modal, View, TouchableWithoutFeedback, ScrollView } from 'react-native';

interface Concert {
  lieu: string;
  date: string;
  heure: string;
  prix: string;
}

interface ArtisteBoxProps {
  artisteLabel: string;
  artisteImage: ImageSourcePropType;
  concerts: Concert[];
  onPress: () => void; // Ajoutez la propriété onPress
}

const ArtisteBox: React.FC<ArtisteBoxProps> = ({ artisteLabel, artisteImage, concerts, onPress }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    onPress(); // Appeler onPress si défini
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={styles.container}>
        <Image
          source={artisteImage}
          style={[styles.image, styles.image3D]}
          resizeMode="cover"
        />
        <Text style={styles.label}>{artisteLabel}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.popupContainer}>
            <View style={styles.popupContent}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.artistName}>{artisteLabel}</Text>
              <ScrollView>
                {concerts && concerts.length > 0 ? (
                  concerts.map((concert, index) => (
                    <View key={index} style={styles.concertView}>
                      <Text style={styles.concertInfo}>{concert.lieu}</Text>
                      <Text style={styles.concertInfo}>{concert.date}</Text>
                      <Text style={styles.concertInfo}>{concert.heure}</Text>
                      <Text style={styles.concertInfo}>{concert.prix}</Text>
                      <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.reserveButton}>
                          <Text style={styles.buttonText}>Réserver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.payButton}>
                          <Text style={styles.buttonText}>Payer</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noConcerts}>Aucun concert disponible</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    padding: 10,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  image3D: {
    transform: [{ perspective: 1000 }, { rotateY: '20deg' }],
  },
  label: {
    marginTop: 8,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  popupContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  concertView: {
    marginBottom: 20,
  },
  concertInfo: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  reserveButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noConcerts: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default ArtisteBox;
