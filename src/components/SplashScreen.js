import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient"; // Importing react-native-linear-gradient

const SplashScreen = ({ onAnimationComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity of 0
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale of 0.8

  useEffect(() => {
    // Animated sequence for fade-in and scaling
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500, // Fade in over 1.5 seconds
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500, // Scale over 1.5 seconds
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Optionally, you can call `onAnimationComplete` after the animation ends
    setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2000); // Duration should be a little more than the animation duration
  }, [fadeAnim, scaleAnim, onAnimationComplete]);

  return (
    <LinearGradient
      colors={["#2c3e50", "#34495e", "#2c3e50"]} // Dark gradient colors
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim, // Bind opacity to animated value
            transform: [{ scale: scaleAnim }], // Bind scale to animated value
          },
        ]}
      >
        {/* Logo */}
        {/* <Image
          source={{
            uri: "https://nitish.musafirbazar.com/assets/playstore.png",
          }}
          style={styles.logo}
        /> */}
        <Image
          source={require("../assets/playstore.png")}
          style={styles.logo}
        />

        {/* Text */}
        <Text style={styles.text}>Welcome to Icon Computer</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150, // Adjust the size of your logo
    height: 150, // Adjust the size of your logo
    marginBottom: 20, // Space between logo and text
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    letterSpacing: 2,
  },
});

export default SplashScreen;
