import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = [
    require('@/app/assets/carousel1.jpg'),
    require('@/app/assets/carousel2.jpg'),
    require('@/app/assets/carousel3.jpg'),
    require('@/app/assets/carousel4.jpg'),
    require('@/app/assets/carousel5.jpg'),
    require('@/app/assets/carousel6.jpg'),
  ];

  const goToNextSlide = () => {
    if (!isPaused) {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 6000);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={togglePause}>
        <Image source={images[currentIndex]} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200, // Adjust the image container height as needed
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default Carousel;
