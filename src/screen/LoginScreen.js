import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginDispatch } from "../../reducers/HomeReducer";
import Loader from "../components/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
      .required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginDispatch(values, navigation));
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <Image
                resizeMode="contain"
                source={require("../assets/playstore.png")}
                style={styles.headerImg}
              />
              <Text style={styles.title}>
                Sign in to{" "}
                <Text style={{ color: "#88dae0" }}>Icon Computer</Text>
              </Text>
              <Text style={styles.subtitle}>
                Get access to your portfolio and more
              </Text>
            </View>
            <View style={styles.form}>
              {/* Phone Field */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="phone-pad"
                  maxLength={10} // Restrict input to 10 characters
                  onChangeText={(text) => {
                    // Allow only numeric input
                    if (/^\d*$/.test(text)) {
                      formik.handleChange("phone")(text);
                    }
                  }}
                  onBlur={formik.handleBlur("phone")}
                  placeholder="Enter 10-digit phone number"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <Text style={styles.error}>{formik.errors.phone}</Text>
                )}
              </View>

              {/* Password Field */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <Text style={styles.error}>{formik.errors.password}</Text>
                )}
              </View>

              {/* Submit Button */}
              <View style={styles.formAction}>
                <TouchableOpacity onPress={formik.handleSubmit}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#938F8F",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#88dae0",
    borderColor: "#88dae0",
    color: "#FFFFFF",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
});