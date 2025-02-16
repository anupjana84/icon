import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import Header from "./Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  customerNewDispatch,
} from "../../reducers/HomeReducer";
import Loader from "./Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCustomer = () => {
  const { login, sales, loading } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    },
    validationSchema,
    onSubmit: (values) => {
      const form = {
        name: values.name,
        phone: values.phone,
        wpnumber: values.wpnumber,
        address: values.address,
        pin: values.pin,
        salesman_id: sales[0]?.id,
      };

      dispatch(customerNewDispatch(form, login?.token));
      // navigation.navigate("confirm");
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
          <ScrollView style={styles.container}>
            <View>
              <Header isCart={true} name={"Add Customer"} />
            </View>
            <View style={styles.formContainer}>
              {/* Name Field */}
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
                placeholder="Enter Name"
              />
              {formik.touched.name && formik.errors.name && (
                <Text style={styles.error}>{formik.errors.name}</Text>
              )}

              {/* Phone Field */}
              <Text style={styles.label}>Phone</Text>
              <TextInput
                keyboardType="numeric"
                maxLength={10}
                style={styles.input}
                onChangeText={(text) => {
                  if (/^\d*$/.test(text)) {
                    formik.handleChange("phone")(text);
                  }
                }}
                onBlur={formik.handleBlur("phone")}
                value={formik.values.phone}
                placeholder="Enter Phone"
              />
              {formik.touched.phone && formik.errors.phone && (
                <Text style={styles.error}>{formik.errors.phone}</Text>
              )}

              {/* WhatsApp Number Field */}
              <Text style={styles.label}>WhatsApp Number</Text>
              <TextInput
                keyboardType="numeric"
                maxLength={10}
                style={styles.input}
                onChangeText={(text) => {
                  if (/^\d*$/.test(text)) {
                    formik.handleChange("wpnumber")(text);
                  }
                }}
                onBlur={formik.handleBlur("wpnumber")}
                value={formik.values.wpnumber}
                placeholder="Enter WhatsApp Number"
              />
              {formik.touched.wpnumber && formik.errors.wpnumber && (
                <Text style={styles.error}>{formik.errors.wpnumber}</Text>
              )}

              {/* Address Field */}
              <Text style={styles.label}>Address</Text>
              <TextInput
             multiline={true}
             numberOfLines={5}
                style={styles.input1}
                onChangeText={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
                value={formik.values.address}
                placeholder="Enter Address"
              />
              {formik.touched.address && formik.errors.address && (
                <Text style={styles.error}>{formik.errors.address}</Text>
              )}

              {/* Pin Code Field */}
              <Text style={styles.label}>Pin Code</Text>
              <TextInput
                keyboardType="numeric"
                maxLength={6}
                style={styles.input}
                onChangeText={(text) => {
                  if (/^\d*$/.test(text)) {
                    formik.handleChange("pin")(text);
                  }
                }}
                onBlur={formik.handleBlur("pin")}
                value={formik.values.pin}
                placeholder="Enter Pin Code"
              />
              {formik.touched.pin && formik.errors.pin && (
                <Text style={styles.error}>{formik.errors.pin}</Text>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={formik.handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
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
};

export default AddCustomer;