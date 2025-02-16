import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Modal from "react-native-modal"; // Import the modal

import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import Loader from "./Loader";
import DatePicker from "react-native-date-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../Axios";
import LinearGradient from "react-native-linear-gradient";
import { clearCartRow } from "../../reducers/UiReducer";
import Header from "./Header";
const OrderForm = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const { loading, sales, login } = useSelector((state) => state.home);
  const { cart } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hedearError, sethedearErrore] = useState("");

  // State for success modal
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be a 10-digit number")
      .required("Phone is required"),
    wpnumber: Yup.string()
      .matches(/^\d{10}$/, "WhatsApp number must be a 10-digit number")
      .required("WhatsApp number is required"),
    address: Yup.string().required("Address is required"),
    pin: Yup.string()
      .matches(/^\d{6}$/, "Pin must be a 6-digit number")
      .required("Pin is required"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      wpnumber: "",
      address: "",
      pin: "",
      date: new Date(),
    },
    validationSchema,
    onSubmit: (values) => {
      if (cart.length === 0) {
        Alert.alert(
          "Error",
          "Please add items to the cart",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }
      // console.log(first)
      const items = cart.map((i) => ({
        product_id: i.id,
        quantity: i.qnty,
        
      }));
      // console.log(items)
      const form = {
        name: values.name,
        phone: values.phone,
        address: values.address,
        pin: values.pin,
        salesman_id: login?.salesman?.id,
        wpnumber: values.wpnumber,
        delivery_data: values.date,
        items: items,
      };
      //console.log(form);
      // return
      submitData(form);
    },
  });

  const submitData = async (formData) => {
    // const bbtoken = login.token;
    //console.log(formData)
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login.token}`,
        },
      };
      const { data } = await axiosInstance.post("/order", formData, config);
      //console.log(JSON.stringify(data), "customer");
      formik.resetForm();
      dispatch(clearCartRow());
      sethedearErrore("Success!");
      setMessage("Order Placed Successfully");
      setIsLoading(false);
      setIsSuccessModalVisible(true);
    } catch (error) {
      if (error.status === 401) {
        setIsLoading(false);
        setMessage("Customer Already Saved in Another Account");
        sethedearErrore("Error!");
        setIsSuccessModalVisible(true);
        //console.log("error", JSON.stringify(error));
        
      }else{
        setIsLoading(false);
        setMessage("Something went wrong");
        sethedearErrore("Error!");
        setIsSuccessModalVisible(true);
        // console.log("error", JSON.stringify(error));
      }

     
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
         <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
                 <ScrollView style={styles.container}>
                 <View>
              <Header isCart={true} name={"Back"} />
            </View>
          {/* Name Field */}
          <View style={{height:20}}/>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            placeholder="Enter Name"
            placeholderTextColor="#999"
          />
          {formik.touched.name && formik.errors.name && (
            <Text style={styles.error}>{formik.errors.name}</Text>
          )}

          {/* Phone Field */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                formik.handleChange("phone")(text); // Allow only numeric input
              }
            }}
            onBlur={formik.handleBlur("phone")}
            value={formik.values.phone}
            placeholder="Enter Phone"
            maxLength={10}
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          {formik.touched.phone && formik.errors.phone && (
            <Text style={styles.error}>{formik.errors.phone}</Text>
          )}

          {/* WhatsApp Number Field */}
          <Text style={styles.label}>WhatsApp Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                formik.handleChange("wpnumber")(text); // Allow only numeric input
              }
            }}
            onBlur={formik.handleBlur("wpnumber")}
            value={formik.values.wpnumber}
            placeholder="Enter WhatsApp Number"
            placeholderTextColor="#999"
            maxLength={10}
            keyboardType="numeric"
          />
          {formik.touched.wpnumber && formik.errors.wpnumber && (
            <Text style={styles.error}>{formik.errors.wpnumber}</Text>
          )}

          {/* Address Field */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input1}
            onChangeText={formik.handleChange("address")}
            onBlur={formik.handleBlur("address")}
            value={formik.values.address}
            placeholder="Enter Address"
            placeholderTextColor="#999"
            multiline
          />
          {formik.touched.address && formik.errors.address && (
            <Text style={styles.error}>{formik.errors.address}</Text>
          )}

          {/* Pin Field */}
          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                formik.handleChange("pin")(text); // Allow only numeric input
              }
            }}
            onBlur={formik.handleBlur("pin")}
            value={formik.values.pin}
            maxLength={6}
            placeholder="Enter Pin Code"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          {formik.touched.pin && formik.errors.pin && (
            <Text style={styles.error}>{formik.errors.pin}</Text>
          )}

          {/* Date Picker */}
          <Text style={styles.label}>Expected Delivery  Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setIsDatePickerOpen(true)}
          >
            <Text>{formik.values.date.toDateString()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={isDatePickerOpen}
            date={formik.values.date}
            onConfirm={(selectedDate) => {
              setIsDatePickerOpen(false);
              formik.setFieldValue("date", selectedDate);
            }}
            onCancel={() => setIsDatePickerOpen(false)}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {/* Success Modal */}
          <Modal
            isVisible={isSuccessModalVisible}
            onBackdropPress={() => setIsSuccessModalVisible(false)} // Close on backdrop press
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{hedearError}</Text>
              <Text style={styles.modalMessage}>{message}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsSuccessModalVisible(false);
                  if (hedearError === "Success!"){

                    navigation.navigate("OrderHistory");
                  }
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={{height:50}}></View>
        </ScrollView>
        </LinearGradient>
      )}
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  formContainer: {
    borderRadius: 8,
    padding: 10,
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
    justifyContent: "center",
  },
  input1: {
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#88dae0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  modalButton: {
    backgroundColor: "#88dae0",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default OrderForm;