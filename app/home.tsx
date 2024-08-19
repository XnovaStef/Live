import React, { useRef, useCallback, useMemo, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import OnboardingPage from '@/component/Onboarding';
import Map from '@/component/map';
import Menu from '@/component/menu';
import axios from 'axios';

type IconName = 'menu' | 'close';

const Home = () => {
    const [isFirstSheetVisible, setIsFirstSheetVisible] = useState(true);
    const [iconName, setIconName] = useState<IconName>('menu');
    const bottomSheetModalRef1 = useRef<BottomSheetModal | null>(null);
    const bottomSheetModalRef2 = useRef<BottomSheetModal | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [lives, setLives] = useState([]);
    const [filteredLives, setFilteredLives] = useState([]);
    const [genres, setGenres] = useState([]);
    const [date, setDate] = useState(new Date());
   

    const snapPoints = useMemo(() => ['45%', '85%'], []);

    const handlePresentModalPress = useCallback(() => {
        if (isFirstSheetVisible) {
            bottomSheetModalRef1.current?.dismiss();
            bottomSheetModalRef2.current?.present();
            setIconName('close'); // Change the icon to "close"
        } else {
            bottomSheetModalRef2.current?.dismiss();
            bottomSheetModalRef1.current?.present();
            setIconName('menu'); // Change the icon to "menu"
        }
        setIsFirstSheetVisible(!isFirstSheetVisible);
    }, [isFirstSheetVisible]);

    useEffect(() => {
        bottomSheetModalRef1.current?.present();
    }, []);

    useEffect(() => {
        // Simulate fetching user location
        setUserLocation({
            latitude: 37.78825,
            longitude: -122.4324,
        });

        // Fetch lives data including genres
        const fetchLives = async () => {
            try {
                const response = await axios.get('https://live-pro.onrender.com/api/live/liveLocation');
                const livesData = response.data;
                setLives(livesData);
                setFilteredLives(livesData);

                // Extract genres from lives data
                const genresData = [...new Set(livesData.map((live: { genre: any; }) => live.genre))];
                setGenres(genresData);
                const dateData = [...new Set(livesData.map((live: { date_live: any; }) => live.date_live))];
                setDate(dateData);
            } catch (error) {
                console.error('Error fetching lives:', error);
            }
        };

        fetchLives();
    }, []);

    useEffect(() => {
        // Filter the lives based on search query, selected genre, and selected date
        let filtered = lives;

        if (searchQuery) {
            filtered = filtered.filter(live =>
                live.adresse.toLowerCase().includes(searchQuery.toLowerCase()) ||
                live.artiste.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedGenre) {
            filtered = filtered.filter(live => live.genre === selectedGenre);
        }

        if (selectedDate) {
            filtered = filtered.filter(live => live.date_live === selectedDate);
        }

        setFilteredLives(filtered);
    }, [searchQuery, selectedGenre, selectedDate, lives]);

    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleLiveSelect = (live) => {
        setSelectedLive(live);
    };

    const onMarkerPress = (live: Live) => {
        setSelectedLive(live); // Mettre à jour les détails du live sélectionné
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
                <View style={styles.container}>
                    <TouchableOpacity style={styles.menuButton} onPress={handlePresentModalPress}>
                        <Ionicons name={iconName} size={24} color="black" />
                    </TouchableOpacity>
                    <Map filteredLives={filteredLives} onLiveSelect={handleLiveSelect} />
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef1}
                    index={0}
                    snapPoints={snapPoints}
                >
                    <OnboardingPage 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        genres={genres}
                        date={date}
                        selectedGenre={selectedGenre}
                        onGenreSelect={handleGenreSelect} selectedLive={undefined} setSelectedLive={undefined} setDate={undefined}                    />
                </BottomSheetModal>
                <BottomSheetModal
                    ref={bottomSheetModalRef2}
                    index={0}
                    snapPoints={snapPoints}
                >
                    <Menu />
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    newSheetContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
