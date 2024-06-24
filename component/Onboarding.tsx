import React, { useCallback, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from "react-native";
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('screen').width;

const OnboardingPage = () => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useRouter();

  const handlePageChange = useCallback((index: number) => {
    setCurrentPage(index);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const navigateToServices = () => {
    router.push('/services');
  };

  const navigateToContact = () => {
    router.push('/contact');
  };

  const goToNextPage = () => {
    if (pagerRef.current) {
      const nextPage = (currentPage + 1) % 2;
      pagerRef.current.setPage(nextPage);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        <View key="1" style={styles.page}>
          <Text style={styles.h1}>Trouvez un live</Text>
          <Text style={styles.h2}>Localité</Text>
          <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
            <View style={styles.searchBarWrapper}>
              <TextInput
                style={styles.searchBar}
                placeholder="Marcory, Sicogi"
                placeholderTextColor="#888"
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.h3}>Genre musical</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Zouglou</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Zouk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Rap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Autres</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={navigateToContact}>
              <Text style={styles.buttonText1}>Contacter artiste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={navigateToServices}>
              <Text style={styles.buttonText1}>Réservation</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View key="2" style={styles.page}>
          <Text style={styles.h1}>Trouvez votre artiste</Text>
          <Text style={styles.h2}>Artiste</Text>
          <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
            <View style={styles.searchBarWrapper}>
              <TextInput
                style={styles.searchBar}
                placeholder="Damso"
                placeholderTextColor="#888"
                underlineColorAndroid="transparent"
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.section}>
            <Icon name="map-marker" size={20} color="pink" style={styles.sectionIcon} />
            <View>
              <Text style={styles.sectionText}>Address</Text>
              <Text style={styles.h2}>Riviera palmeraie</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Icon name="clock-o" size={20} color="pink" style={styles.sectionIcon} />
            <View>
              <Text style={styles.sectionText}>Heure</Text>
              <Text style={styles.h2}>03:00 PM</Text>
            </View>
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={togglePlay}>
              <Icon
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={20}
                color="pink"
                style={styles.sectionIcon}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.sectionText}>Extrait</Text>
              <Text style={styles.h2}>Noir meilleur</Text>
            </View>
          </View>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={navigateToContact}>
              <Text style={styles.buttonText1}>Contacter artiste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={navigateToServices}>
              <Text style={styles.buttonText1}>Réservation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PagerView>
      <TouchableOpacity style={styles.nextButton} onPress={goToNextPage}>
        <Icon name={currentPage === 0 ? "arrow-right" : "arrow-left"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#1E1E1E"
  },
  h2: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: '100',
    color: "#9D9D9D"
  },
  h3: {
    fontSize: 15,
    marginTop: 40,
    fontWeight: '300',
    color: "#1E1E1E"
  },
  searchBarWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 20,
  },
  searchBar: {
    height: 15,
    width: windowWidth - 32,
    paddingHorizontal: 10,
    fontSize: 10,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  actionButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText1: {
    color: 'white',
    fontSize: 14,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionIcon: {
    fontSize: 25,
    marginRight: 10,
  },
  sectionText: {
    fontSize: 10,
    color: "#9D9D9D",
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingPage;
