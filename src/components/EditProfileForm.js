import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import { Picker } from "@react-native-picker/picker"; // Import Picker for dropdown
import Header from "./Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  customerDispatch,
  updateProductDispatch,
  updateUserDispatch,
} from "../../reducers/HomeReducer";
import Loader from "./Loader";

const EditProfileForm = () => {
  const [load, setLoad] = useState(false);
  const { login } = useSelector((state) => state.home);
  //  console.log("first", login);
  const [name, setName] = useState(login?.result?.name);
  const [address, setAddress] = useState(login?.result?.wpnumber);
  const [phone, setPhone] = useState(login?.result?.phone);
  const route = useRoute();
  //   const product = route.params.item;
  const { loading } = useSelector((state) => state.home);
  const { cart } = useSelector((state) => state.ui);
  //  console.log("cart", cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSubmit = () => {
    //  console.log({
    //   name,
    //   phone,
    //   address,
    //   pin,
    // });
    let form = {
      name: name,
      phone: phone,
      wpnumber: address,
    };

    dispatch(updateUserDispatch(form, login?.token));
    // navigation.navigate("confirm");
  };

  return (
    <>
      {loading || load ? (
        <Loader />
      ) : (
        <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
          <ScrollView style={styles.container}>
            <View>
              <Header isCart={true} name={"Edit Profile"} />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Enter Name"
              />

              <Text style={styles.label}>Phone</Text>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#999"
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="Enter Phone"
              />

              <Text style={styles.label}>Whatapp Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAddress}
                value={address}
                placeholder="Enter Address"
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            {/* <Loader /> */}
          </ScrollView>
        </LinearGradient>
      )}
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    // backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 5,
    // paddingBottom: 200,
    // marginBottom: 100,
  },
  formContainer: {
    // backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 2 },
    // elevation: 3,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  thumbnailButton: {
    flexDirection: "row",
    backgroundColor: "#88dae0",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  thumbnailButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdownContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  dropdown: {
    height: 45,
    paddingLeft: 12,
    color: "#333",
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    marginBottom: 10,
  },
  iconButtonText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  imageScrollContainer: {
    marginBottom: 16,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
    padding: 5,
  },
  submitButton: {
    backgroundColor: "#88dae0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default EditProfileForm;
