
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
// import { RNCamera } from "react-native-camera";
import { useDispatch } from "react-redux";
import { productbarcodeDispatch } from "../../reducers/HomeReducer";
import { useNavigation } from "@react-navigation/native";

const Scanner = () => {
  const [barcode, setBarcode] = useState("");
  const [flash, setFlash] = useState(false);
  const slideAnim = new Animated.Value(100); // Initial position for sliding down
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // useEffect(() => {
  //   let d = "06MBEORN575112024GY";
  //   dispatch(productbarcodeDispatch(d, navigation));
  // }, []);
  const onBarcodeRead = (e) => {
    setBarcode(e.data);
    slideUp(); // Trigger slide-up animation when barcode is scanned

    // alert(`Barcode scanned: ${e.data}`);
    let d = "06MBEORN575112024GY";
    dispatch(productbarcodeDispatch(e.data, navigation));
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  // Slide up animation
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Target position to slide up
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Slide down animation
  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 100, // Target position to slide down
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Slide down the barcode result when the component is mounted
    if (!barcode) {
      slideDown();
    }
  }, [barcode]);
  return (
    <View style={styles.container}>
     {/* / <Camera {...props} codeScanner={codeScanner} /> */}
      {/* <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onBarcodeRead}
        captureAudio={false}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      >*/}
        <View style={styles.overlay}>
         
          <View style={styles.scanFrame}>
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
            <View style={styles.bottomLeft} />
            <View style={styles.bottomRight} />
          </View>

      
          <View style={styles.scanningLine} />
        </View>
      {/* </RNCamera> */}

      {/* Animated barcode display */}
      <Animated.View
        style={[
          styles.barcodeTextContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.barcodeText}>
          Scanned Barcode: {barcode || "Waiting for scan..."}
        </Text>
      </Animated.View>

      {/* Flash toggle button */}
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
        <Text style={styles.flashButtonText}>
          {flash ? "Turn Off Flash" : "Turn On Flash"}
        </Text>
      </TouchableOpacity>

      {/* Instruction text */}
      <Text style={styles.instructionText}>
        Align the barcode within the frame to scan it.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    position: "absolute",
    width: "80%",
    height: "60%",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "space-between",
  },
  topLeft: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
  },
  topRight: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
  },
  bottomLeft: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
  },
  bottomRight: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
  },
  scanningLine: {
    position: "absolute",
    width: "80%",
    height: 2,
    backgroundColor: "#ff0000",
    top: "50%",
    left: "10%",
    animationName: "scanningAnimation",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  barcodeTextContainer: {
    position: "absolute",
    bottom: 60,
    width: "80%",
    alignItems: "center",
  },
  barcodeText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  flashButton: {
    position: "absolute",
    bottom: 120,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flashButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  instructionText: {
    position: "absolute",
    bottom: 30,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "80%",
    padding: 10,
    borderRadius: 5,
  },
});

export default Scanner;
