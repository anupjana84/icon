import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import { Picker } from "@react-native-picker/picker"; // Import Picker for dropdown

const ProductForm = () => {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState(false); // false = Inactive, true = Active
  const [warranty, setWarranty] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [images, setImages] = useState([]);
  const [productList, setProductList] = useState(""); // State to store selected product from dropdown

  // Sample product list
  const products = [
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
    { id: "3", name: "Product 3" },
    { id: "4", name: "Product 4" },
  ];

  const handleImageSelection = () => {
    const options = {
      mediaType: "photo",
      selectionLimit: 0, // Unlimited image selection
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        //  console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.error(response.errorMessage);
      } else {
        setImages(response.assets); // Set multiple selected images
      }
    });
  };
  const uploadImage = async () => {
    if (!imageUri || !name.trim()) {
      Alert.alert(
        "Missing Data",
        "Please select an image and fill in all required fields."
      );
      return;
    }

    const formData = new FormData();

    // Append the image with a specific field name
    formData.append("pimage", {
      uri: imageUri,
      type: "image/jpeg", // Or use response.assets[0]?.type
      name: "uploaded_image.jpg",
    });

    // Append additional fields
    formData.append("name", name);

    try {
      const response = await axios.post(
        "https://api.marinersforex.com/api/home/addint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Image and data uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error", "Image upload failed. Please try again.");
    }
  };

  const handleCameraSelection = () => {
    const options = {
      mediaType: "photo",
      cameraType: "back",
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        //  console.log("User cancelled camera picker");
      } else if (response.errorMessage) {
        console.error(response.errorMessage);
      } else {
        setImages([response.assets[0]]); // Add only the selected photo
      }
    });
  };

  const handleThumbnailSelection = () => {
    const options = {
      mediaType: "photo",
      selectionLimit: 1, // Only one thumbnail image
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        //  console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.error(response.errorMessage);
      } else {
        setThumbnailImage(response.assets[0]); // Set the thumbnail image
      }
    });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages); // Remove the image from the array
  };

  const handleSubmit = () => {
    //  console.log({
      id,
      description,
      discount,
      status: status ? "Active" : "Inactive", // Convert boolean to readable value
      warranty,
      thumbnailImage,
      images,
      productList, // Include selected product from dropdown
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={setId}
          value={id}
          placeholder="Enter ID"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Enter Description"
        />

        <Text style={styles.label}>Discount</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDiscount}
          value={discount}
          placeholder="Enter Discount"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {status ? "Active" : "Inactive"}
          </Text>
          <Switch
            value={status}
            onValueChange={setStatus}
            trackColor={{ false: "#ccc", true: "#4caf50" }}
            thumbColor={status ? "#007bff" : "#f4f3f4"}
          />
        </View>

        <Text style={styles.label}>Warranty</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWarranty}
          value={warranty}
          placeholder="Enter Warranty"
        />

        <Text style={styles.label}>Thumbnail Image</Text>
        <TouchableOpacity
          style={styles.thumbnailButton}
          onPress={handleThumbnailSelection}
        >
          <Icon name="image" size={20} color="#fff" />
          <Text style={styles.thumbnailButtonText}>Select Thumbnail Image</Text>
        </TouchableOpacity>

        {thumbnailImage && (
          <Image
            source={{ uri: thumbnailImage.uri }}
            style={styles.thumbnailImage}
          />
        )}

        <Text style={styles.label}>Product List</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={productList}
            onValueChange={(itemValue) => setProductList(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Select a product" value="" />
            {products.map((product) => (
              <Picker.Item
                key={product.id}
                label={product.name}
                value={product.id}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
  },
  thumbnailButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
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
  submitButton: {
    backgroundColor: "#007bff",
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
};

export default ProductForm;
