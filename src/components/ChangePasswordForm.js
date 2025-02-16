import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { changepasswordDispatch } from "../../reducers/HomeReducer";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordForm = () => {
  const { login } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  //  console.log("login", login);
  const navigation = useNavigation();
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("Current password is required"),
    new_password: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Submit handler
  const handleSubmit = (values) => {
    // Alert.alert("Password Changed", JSON.stringify(values));
    dispatch(changepasswordDispatch(values, login?.result?.id, login?.token));
    // Replace this alert with your API integration logic
    // let form = {
    //   current_password: "123456",
    //   new_password: "123457",
    //   new_password_confirmation: "123457",
    // };
  };

  return (
    <View style={styles.container}>
      <View>
        <Header isCart={true} name={"Change Password"} />
      </View>
      {/* <Text style={styles.title}>Change Password</Text> */}
      <Formik
        initialValues={{
          current_password: "",
          new_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ marginTop: 50 }}>
            {/* Current Password */}
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={[
                styles.input,
                touched.current_password &&
                  errors.current_password &&
                  styles.errorInput,
              ]}
              placeholder="Enter current password"
              secureTextEntry
              onChangeText={handleChange("current_password")}
              onBlur={handleBlur("current_password")}
              value={values.current_password}
            />
            {touched.current_password && errors.current_password && (
              <Text style={styles.errorText}>{errors.current_password}</Text>
            )}

            {/* New Password */}
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={[
                styles.input,
                touched.new_password &&
                  errors.new_password &&
                  styles.errorInput,
              ]}
              placeholder="Enter new password"
              secureTextEntry
              onChangeText={handleChange("new_password")}
              onBlur={handleBlur("new_password")}
              value={values.new_password}
            />
            {touched.new_password && errors.new_password && (
              <Text style={styles.errorText}>{errors.new_password}</Text>
            )}

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={[
                styles.input,
                touched.confirmPassword &&
                  errors.confirmPassword &&
                  styles.errorInput,
              ]}
              placeholder="Confirm new password"
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChangePasswordForm;
