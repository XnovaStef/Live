import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const windowWidth = Dimensions.get('screen').width;

const OnboardingPage = ({ searchQuery, setSearchQuery, genres, selectedGenre, onGenreSelect, selectedLive, setSelectedLive, date, setDate, liveEvents }) => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const router = useRouter();

  // Assurez-vous que `liveEvents` est un tableau
  useEffect(() => {
    if (Array.isArray(liveEvents)) {
      // Filtrer les événements en fonction de la date sélectionnée
      if (date) {
        const formattedDate = date.toISOString().split('T')[0]; // Convertir la date au format 'YYYY-MM-DD'
        const filtered = liveEvents.filter(event => event.date_live === formattedDate);
        setFilteredEvents(filtered);
      } else {
        setFilteredEvents(liveEvents); // Si aucune date n'est sélectionnée, afficher tous les événements
      }
    } else {
      console.error("`liveEvents` doit être un tableau");
    }
  }, [date, liveEvents]);

  const handlePageChange = useCallback((index: number) => {
    setCurrentPage(index);
  }, []);

  const togglePlay = async () => {
    if (isPlaying) {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('@/app/assets/extrait.mp3')
        );
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
      }
    }
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (setDate) { // Assurez-vous que setDate est défini avant de l'appeler
      setDate(date);
    }
    hideDatePicker();
  };

  const handleGenreSelect = (genre: string) => {
    if (genre === 'Tout') {
      onGenreSelect(null); // Réinitialiser la sélection
      setFilteredEvents(liveEvents); // Afficher tous les événements
    } else {
      onGenreSelect(genre); // Sélectionner un genre spécifique
    }
  };

  // Assurez-vous que `date` est un objet Date valide
  const dateValue = date instanceof Date ? date : new Date();

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
              <TouchableOpacity onPress={showDatePicker}>
                <Icon name="calendar" size={20} color="black" style={styles.calendarIcon} />
              </TouchableOpacity>
              <TextInput
                style={styles.searchBar}
                placeholder="Search for locations"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.h3}>Genre musical</Text>
          <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={[styles.button, selectedGenre === null && styles.selectedGenreButton]}
    onPress={() => handleGenreSelect('Tout')}
  >
    <Text style={styles.buttonText}>Tout</Text>
  </TouchableOpacity>
  {genres.map((genre, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.button, selectedGenre === genre && styles.selectedGenreButton]}
      onPress={() => handleGenreSelect(genre)}
    >
      <Text style={styles.buttonText}>{genre}</Text>
    </TouchableOpacity>
  ))}
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
                placeholder="Cherchez artiste"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.section}>
            <TouchableOpacity onPress={togglePlay}>
              <Icon
                name={isPlaying ? 'pause-circle' : 'play-circle'}
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
        <Icon name={currentPage === 0 ? 'arrow-right' : 'arrow-left'} size={24} color="white" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={dateValue}  // Assurez-vous que `date` est un objet Date valide
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="Sélectionner une date"
        confirmTextIOS="Confirmer"
        cancelTextIOS="Annuler"
      />
    </View>
  );
};

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
    color: '#1E1E1E',
  },
  h2: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: '100',
    color: '#9D9D9D',
  },
  h3: {
    fontSize: 15,
    marginTop: 40,
    fontWeight: '300',
    color: '#1E1E1E',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  calendarIcon: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
  },
  selectedGenreButton: {
    backgroundColor: '#E91E63',
  },
  buttonText: {
    color: '#1E1E1E',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#E91E63',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
  },
  buttonText1: {
    color: 'white',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionText: {
    fontSize: 16,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#E91E63',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingPage;
