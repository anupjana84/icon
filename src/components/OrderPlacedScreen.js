import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient"; // Gradient background
import { useDispatch, useSelector } from "react-redux";
import { clearCartRow } from "../../reducers/UiReducer";
import Loader from "./Loader";

const OrderPlacedScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(clearCartRow());
    // Start animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500, // Fade in duration
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500, // Scale duration
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const handleBackToHome = () => {
    if (navigation) {
      dispatch(clearCartRow());
      navigation.navigate("OrderHistory"); // Replace "Home" with your home screen route
    }
  };
  if (loading) {
    return <Loader />;
  }
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
        <Image
          source={{
            uri: "https://cdn4.sharechat.com/compressed_gm_40_img_77819_6047edd_1700410075476_sc.jpg?tenant=sc&referrer=tag-service&f=476_sc.jpg",
          }}
        ></Image>
        <Text style={styles.title}>Order Placed</Text>
        <Text style={styles.subtitle}>Thank you for your order.</Text>
        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>Order History</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#dcdcdc",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1abc9c",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OrderPlacedScreen;
