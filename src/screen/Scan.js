import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { productbarcodeDispatch } from '../../reducers/HomeReducer';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Scan = () => {
  const device = useCameraDevice('back');
  const { hasPermission: cameraHasPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const camera = useRef(null);

  // State variables
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);

  // Request camera permission
  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();
    if (!granted) {
      Alert.alert(
        'Camera Permission Required',
        'Please grant camera access in your device settings to use this feature.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  useEffect(() => {
    if (!cameraHasPermission) {
      handleCameraPermission();
    }
  }, [cameraHasPermission]);

  // Barcode/QR code scanner logic
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'code-128'],
    onCodeScanned: (codes) => {
      if (enableOnCodeScanned && codes.length > 0) {
        const value = codes[0]?.value;
        const type = codes[0]?.type;

        if (type === 'qr') {
          Alert.alert('Invalid Scan', 'Please scan a barcode instead of a QR code.');
          navigation.goBack();
        } else if (value) {
          setIsScanning(true);
          onBarcodeRead(value);
        }

        setEnableOnCodeScanned(false); // Prevent duplicate scans
      }
    },
  });

  // Dispatch scanned barcode value
  const onBarcodeRead = (value) => {
    dispatch(productbarcodeDispatch(value, navigation));
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      {device ? (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          torch={torchOn ? 'on' : 'off'}
          codeScanner={codeScanner}
          frameProcessorFps={5}
          onTouchEnd={() => setEnableOnCodeScanned(true)} // Re-enable scanning after touch
        />
      ) : (
        <View style={styles.noCameraContainer}>
          <Text style={styles.noCameraText}>No camera available</Text>
        </View>
      )}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="white" />
      </TouchableOpacity>

      {/* Flashlight Toggle */}
      <TouchableOpacity style={styles.flashlightButton} onPress={() => setTorchOn(!torchOn)}>
        <MaterialCommunityIcons name={torchOn ? 'flashlight' : 'flashlight-off'} size={35} color="white" />
      </TouchableOpacity>

      {/* Scanning Indicator */}
      {enableOnCodeScanned && (
        <View style={styles.scanningIndicator}>
          <Text style={styles.scanningText}>Scanning...</Text>
        </View>
      )}

      {/* Loading Indicator */}
      {isScanning && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </View>
  );
};

export default Scan;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  noCameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  noCameraText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  flashlightButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  scanningIndicator: {
    position: 'absolute',
    top: height / 2 - 50,
    left: width / 2 - 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    position: 'absolute',
    top: height / 2 - 25,
    left: width / 2 - 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});