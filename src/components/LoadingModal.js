import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const LoadingModal = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const { farerule } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  // //  console.log('navigation', navigation);
  return (
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ModalPoup visible={farerule}>
      <View style={{ alignItems: "center" }}>
        {/* <Text style={{color: 'black', fontSize: 20}}>Loading</Text> */}
        <Text style={{ color: "black", fontSize: 20 }}>Please Wait....</Text>
      </View>
    </ModalPoup>

    // </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: "lightgrey" },
});

export default LoadingModal;
