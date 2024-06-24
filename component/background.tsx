import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';

interface BackgroundProps {
  children: ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={require('@/app/assets/back.jpg')}
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
