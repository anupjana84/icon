import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Warnning = ({showModal, setshowModal,onClick}) => {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  const handleCancel = () => {
    // console.log('Cancel button pressed');
    toggleModal();
  };

  const handleOk = () => {
    // console.log('OK button pressed');
    toggleModal();
  };

  return (
    <View style={styles.container}>
      

      <Modal isVisible={showModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure want to delete Image?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Yes" onPress={()=>{
              onClick()
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Warnning;