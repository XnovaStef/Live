import React, { useRef, useEffect } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions, ScrollView } from 'react-native';

const logos = [
  require('@/app/assets/logo1.jpg'),
  require('@/app/assets/logo2.jpg'),
  require('@/app/assets/logo3.jpg'),
  // Add more logos as needed
];

const ScrollingLogos = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const startScrolling = () => {
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: windowWidth, // Adjust based on the total width of your content
          duration: 1000, // Duration for one complete scroll
          useNativeDriver: true,
        })
      ).start();
    };

    startScrolling();
  }, [scrollX, windowWidth]);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: value, animated: false });
      }
    });

    return () => scrollX.removeAllListeners();
  }, [scrollX]);

  return (
    <View style={styles.logoContainer}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )
        }
      >
        {logos.map((logo, index) => (
          <Image key={index} source={logo} style={styles.logo} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to 'flex-start' to align logos to the start
  },
  logo: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
});

export default ScrollingLogos;
