import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ImageSourcePropType } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

// Define the prop types
interface ServiceBoxProps {
  serviceLabel: string;
  serviceImage: ImageSourcePropType;
  onPress: () => void;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({ serviceLabel, serviceImage, onPress }) => {
  const { width: windowWidth } = useWindowDimensions();
  const boxSize = windowWidth * 0.35; // Adjust the percentage as needed for the desired box size
  const maxBoxWidth = 185; // Change this value to your desired maximum width

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <TouchableOpacity
  onPress={onPress}
  accessibilityRole="button"
  accessibilityLabel={serviceLabel}
  onPressIn={() => setIsHovered(true)}
  onPressOut={() => setIsHovered(false)}
>
      <LinearGradient
        colors={['#FF7E5F', '#FD3A69']}
        style={[
          styles.container,
          { width: boxSize, height: boxSize, maxWidth: maxBoxWidth },
          isHovered && { transform: 'rotateX(10deg)' }, // Apply the transformation on hover
        ]}
      >
        <Image
          source={serviceImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.label}>{serviceLabel}</Text>
      </LinearGradient>
    </TouchableOpacity>
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
      transform: [{ perspective: 1000 }, { rotateX: '0deg' }], // Initial 0deg rotation
    },
    image: {
      height: "50%",
      width: "50%",
      borderRadius: 10,
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
  });
  

export default ServiceBox;
