import React, { useRef, useCallback, useMemo, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import OnboardingPage from '@/component/Onboarding';
import Map from '@/component/map';
import Menu from '@/component/menu'

type IconName = 'menu' | 'close';

const Home = () => {
    const [isFirstSheetVisible, setIsFirstSheetVisible] = useState(true);
    const [iconName, setIconName] = useState<IconName>('menu');
    const bottomSheetModalRef1 = useRef<BottomSheetModal | null>(null);
    const bottomSheetModalRef2 = useRef<BottomSheetModal | null>(null);

    const snapPoints = useMemo(() => ['45%', '85%'], []);

    const handlePresentModalPress = useCallback(() => {
        if (isFirstSheetVisible) {
            bottomSheetModalRef1.current?.dismiss();
            bottomSheetModalRef2.current?.present();
            setIconName('close'); // Changer l'icône en "close"
        } else {
            bottomSheetModalRef2.current?.dismiss();
            bottomSheetModalRef1.current?.present();
            setIconName('menu'); // Changer l'icône en "menu"
        }
        setIsFirstSheetVisible(!isFirstSheetVisible);
    }, [isFirstSheetVisible]);

    useEffect(() => {
        bottomSheetModalRef1.current?.present();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
                <View style={styles.container}>
                    <TouchableOpacity style={styles.menuButton} onPress={handlePresentModalPress}>
                        <Ionicons name={iconName} size={24} color="black" />
                    </TouchableOpacity>
                    <Map />
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef1}
                    index={0}
                    snapPoints={snapPoints}
                >
                    <OnboardingPage />
                </BottomSheetModal>
                <BottomSheetModal
                    ref={bottomSheetModalRef2}
                    index={0}
                    snapPoints={snapPoints}
                >
                    <Menu/>
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
