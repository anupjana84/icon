import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Linking
} from "react-native";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import { baseUrl } from "../utils/apiList";
import { Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-native-date-picker";
import Loader from "../components/Loader";

// Helper function to format the date as DD-MM-YYYY
const formatDate = (date) => {
  if (!date) return ""; // Handle null or undefined dates
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // Change the format as needed (e.g., MM/DD/YYYY)
};

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: Yup.string().required("Address is required"),
  pin: Yup.string()
    .required("PIN is required")
    .matches(/^[0-9]{6}$/, "PIN must be 6 digits"),
  note: Yup.string(),
  callDate: Yup.date()
    .min(new Date(), "Call Date must be in the future"),
    invoiceImage: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileSize",
          "File size is too large (max 5MB)",
          (value) => !value || (value.fileSize && value.fileSize <= 5 * 1024 * 1024)
        )
        .test(
          "fileType",
          "Unsupported file type (only JPEG/PNG allowed)",
          (value) => !value || (value.type && ["image/jpeg", "image/png"].includes(value.type))
        )
    )
    .min(1, "At least one image is required")
    .required("Invoice Images are required"),
});

const AddRecordForm = () => {
  const [invoiceImage, setInvoiceImage] = useState([]);
 
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

  // Handle image selection
  const handleImageSelection = async (setFieldValue) => {
    const options = {
      mediaType: "photo",
      selectionLimit: 5,
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        const selectedImages = response.assets;
        setInvoiceImage(selectedImages);
        setFieldValue("invoiceImage", selectedImages);// Update Formik state
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
     
       const formData = new FormData();
       formData.append("name", values.name);//
       formData.append("phone", values.phone);
       formData.append("address", values.address);
       formData.append("pin", values.pin);
       formData.append("note", values.note);
       formData.append("call_date", values.callDate.toISOString());
   
      if (invoiceImage.length > 0) {
        invoiceImage.forEach((image, index) => {
          formData.append("invoice_images", {
            uri: image.uri,
            type: image.type,
            name: image.fileName || `invoice_image_${index + 1}.jpg`,
          });
        });
      }
    // Ensure the date is in ISO format
     

      const response = await axios.post(`${baseUrl}/service-request`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
    
        //  console.log(response.data.status)
      
        setIsLoading(false);
        //Alert.alert("Success", "Record added successfully!");
        resetForm(); // Reset the form using Formik's resetForm method
        setInvoiceImage(null); // Clear the invoice image
        setTimeout(() => {
          handleWhatsApp(response.data?.status)
        }, 2000);
     
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", JSON.stringify(error));
      Alert.alert("Error", "Failed to add record. Please try again.");
    }
  };

  

const handleWhatsApp = (data) => {
  // Make sure it's formatted correctly with country code
  const url = `${data}`;

  Linking.openURL(url).catch((err) => {
    console.error('Error opening WhatsApp', err);
  });
};
  return (
    <>
    {isLoading ? (<Loader/>):(
    <Formik
      initialValues={{
        name: "",
        phone: "",
        address: "",
        pin: "",
        note: "",
        callDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Initialize with tomorrow's date
        invoiceImage: null, // Add invoiceImage to initial values
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, resetForm }) => (
        <ScrollView style={styles.container}>
          <View style={{ width: '100%', height: 50, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Add Record</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholder="Enter Name"
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={values.phone}
              maxLength={10}
              keyboardType="numeric" // Ensure numeric keyboard for phone input
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              placeholder="Enter Phone Number"
            />
            {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={values.address}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              placeholder="Enter Address"
            />
            {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

            <Text style={styles.label}>PIN</Text>
            <TextInput
              style={styles.input}
              value={values.pin}
              maxLength={6}
              keyboardType="numeric" // Ensure numeric keyboard for PIN input
              onChangeText={handleChange("pin")}
              onBlur={handleBlur("pin")}
              placeholder="Enter PIN"
            />
            {touched.pin && errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              value={values.note}
              onChangeText={handleChange("note")}
              onBlur={handleBlur("note")}
              placeholder="Enter Note"
            />
            {touched.note && errors.note && <Text style={styles.errorText}>{errors.note}</Text>}

            <Text style={styles.label}>Invoice Image</Text>
            <TouchableOpacity onPress={() => handleImageSelection(setFieldValue)} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Select Invoice Image</Text>
            </TouchableOpacity>
            <View style={{with:'100%',flexDirection:'row',flexWrap:'wrap'}}>
            {invoiceImage && invoiceImage.length > 0 &&
                invoiceImage.map((image, index) => (
                  <Image key={index} source={{ uri: image.uri }} style={styles.selectedImage} />
                ))}
            </View>
           
            {touched.invoiceImage && errors.invoiceImage && (
              <Text style={styles.errorText}>{errors.invoiceImage}</Text>
            )}

            <Text style={styles.label}>Call Date</Text>
            <TouchableOpacity onPress={() => setIsDatePickerOpen(true)}>
              <TextInput
                style={styles.input}
                value={formatDate(values.callDate)} // Use the helper function here
                placeholder="Select Call Date"
                editable={false}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              open={isDatePickerOpen}
              date={values.callDate}
              onConfirm={(selectedDate) => {
                setFieldValue("callDate", selectedDate); // Update Formik value
                setIsDatePickerOpen(false); // Close the date picker
              }}
              onCancel={() => setIsDatePickerOpen(false)} // Close the date picker on cancel
              minimumDate={new Date()} // Restrict to future dates
            />
            {touched.callDate && errors.callDate && <Text style={styles.errorText}>{errors.callDate}</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>

  )}
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  formContainer: {
    padding: 20,
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
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  imageButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft:10
  },
  submitButton: {
    backgroundColor: "#28a745",
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 12, // Add padding for better alignment
  },
});

export default AddRecordForm;