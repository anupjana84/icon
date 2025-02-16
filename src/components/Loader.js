import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from "react-native";

const Loader = () => {
  const [scaleAnim] = useState(new Animated.Value(0)); // Animation for scale
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade effect

  // Animate the loader scale and background fade when the loader appears
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.blurContainer,
          { opacity: fadeAnim }, // Apply fade effect
        ]}
      >
        <Animated.View
          style={[
            styles.loaderContainer,
            { transform: [{ scale: scaleAnim }] },
          ]} // Apply scale animation
        >
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099", // Semi-transparent background
  },
  blurContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff", // White background for loader container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Adds shadow on Android
  },
  loadingText: {
    marginTop: 10,
    color: "#333", // Darker text color for readability
    fontSize: 16,
    fontFamily: "Poppins-Regular", // You can change to any other font
  },
});

export default Loader;
