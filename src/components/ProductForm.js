import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,

} from "react-native";
import axios from "axios";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "./Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { productAllDispatch, } from "../../reducers/HomeReducer";
import Loader from "./Loader";
import { setProductDetails } from "../../reducers/ProductDetails";
import { baseUrl } from "../utils/apiList";
import Warnning from "./ModalComponent";

const ProductForm = () => {
  const route = useRoute();
  const product = route.params?.item || {};
   console.log(product,'product');

  const productDetails = useSelector((state) => state.productDetails);

  const { login } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [load, setLoad] = useState(false);
  const [description, setDescription] = useState(product?.details?.description || "");
  const [discount, setDiscount] = useState(product?.details?.mrp || "");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState( []
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [selectedDeleteIMage, setSelectedDeleteIMage] = useState(null);
  const [indexSelectedDeleteIMage, setIndexSelectedDeleteIMage] = useState(null);

  const imag = product?.details?.image ? JSON.parse(product?.details?.image) : [];

  const handleImageSelection = () => {
    const options = {
      mediaType: "photo",
      selectionLimit: 4, // Unlimited image selection
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        setImages(response.assets); // Set multiple selected images
      }
    });
  };

  // Handle image capture from camera
  const handleCameraSelection = () => {
    const options = {
      mediaType: "photo",
      cameraType: "back",
    };
    launchCamera(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        setImages([response.assets[0]]); // Add only the selected photo
      }
    });
  };

  // Handle thumbnail image selection
  const handleThumbnailSelection = () => {
    const options = {
      mediaType: "photo",
      selectionLimit: 1, // Only one thumbnail image
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        setThumbnailImage(response.assets[0]); // Set the thumbnail image
      }
    });
  };

  // Delete an image from the newly selected images
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages); // Remove the image from the array
  };

  // Delete an image from the existing images
  const handleDeleteExistingImage = (index, image) => {
setshowModal(true)
setSelectedDeleteIMage(image)
setIndexSelectedDeleteIMage(index)

  };

  const deleteServerImage=()=>{
  
    deleteImage(selectedDeleteIMage)//

    const updatedImages = existingImages.filter((_, i) => i !== indexSelectedDeleteIMage);
    setExistingImages(updatedImages); // Remove the image from the array

  }
  const deleteImage = async (image) => {
    const formData = {
      image: image,
    }
    setLoad(true)
    const endpoint = `https://iconcomputer.in/api/deleteProductImage/${product?.details_id}`
    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      });
      setLoad(false)
    setIndexSelectedDeleteIMage(null)
      setshowModal(false)
      setSelectedDeleteIMage(null)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(selectedDeleteIMage,"selectedDeleteIMage")
  // console.log(indexSelectedDeleteIMage,"indexSelectedDeleteIMage")
  // Upload images and form data to the server
  const uploadImage = async () => {
      if (product.details == null) {
         console.log("first")
          if (!thumbnailImage) {

            Alert.alert(
              "Missing Data",
              "Please select an image and fill in all required fields."
            );
            return;
          }
          if (images.length < 1) {

            Alert.alert(
              "Missing Data",
              "Please select at least one image and fill in all required fields."
            );
            return;
          }
          if (!description) {
            Alert.alert(
              "Missing Data",
              "Please fill in the description field."
            );
            return;
          }
          if (!discount) {
            Alert.alert(
              "Missing Data",
              "Please fill in the discount field."
            );
            return;
          }
          const formData = new FormData();

          if (thumbnailImage) {

            formData.append("thumbnail_image", {
              uri: thumbnailImage.uri,
              type: thumbnailImage.type,
              name: thumbnailImage.fileName,
            });
          }
          if (images.length > 0) {

              images.forEach((file, index) => {
                formData.append("images[]", {
                  uri: file.uri,
                  type: file.type || "image/jpeg",
                  name: file.fileName || `image_${index}.jpg`,
                });
              });
            }
            formData.append("description", description);
          
            formData.append("mrp", discount);
            formData.append("product_id", product?.id);

          if (product?.sale_price <= parseFloat(discount)) {
            try {
              setLoad(true);
              const endpoint =  `${baseUrl}/updateProductDetails`;

              const response = await axios.post(endpoint, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${login?.token}`,
                },
              });
              //console.log(response , "uu");
              // console.log(JSON.stringify(response) , "response");
              if (response) {
                setLoad(false);
                Alert.alert("Success", product?.details ?
                   "Product updated successfully!" : "Product added successfully!");
               // dispatch(setProductDetails(response?.data?.result))
                dispatch(productAllDispatch());
                navigation.navigate("Productlist");
              }
            } catch (error) {
              setLoad(false);
              // console.log(JSON.stringify(error))
              console.error("Error uploading : ", error);
              Alert.alert("Error", " upload failed . Please try again.");
            }
          } else {
            Alert.alert("Error", "Please enter a valid MRP price.");
          }
      
      }else{
        console.log("second")
        const formData = new FormData();
// console.log(formData)
        if (thumbnailImage) {

          formData.append("thumbnail_image", {
            uri: thumbnailImage.uri,
            type: thumbnailImage.type,
            name: thumbnailImage.fileName,
          });
        }
        if (images.length > 0) {

              images.forEach((file, index) => {
                formData.append("images[]", {
                  uri: file.uri,
                  type: file.type || "image/jpeg",
                  name: file.fileName || `image_${index}.jpg`,
                });
              });
            }
                formData.append("description", description);
                formData.append("product_id", product?.id);
                formData.append("mrp", discount);
                  // console.log(formData) 
          if (product?.sale_price <= parseFloat(discount)) {
            try {
             
              setLoad(true);
              const endpoint =  `https://iconcomputer.in/api/updateProductDetailsexit/${product?.details_id}`
                

              const response = await axios.post(endpoint, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${login?.token}`,
                },
              });
              //console.log(response , "uu");
              // console.log(JSON.stringify(response) , "response");
              if (response) {
                setLoad(false);
                Alert.alert("Success", product?.details ? "Product updated successfully!" : "Product added successfully!");
                dispatch(setProductDetails(response?.data?.result))
                dispatch(productAllDispatch());
                navigation.navigate("Productlist");
              }
            } catch (error) {
              setLoad(false);
              // console.log(JSON.stringify(error))
              console.error("Error uploading image: ", error);
              Alert.alert("Error", "Image upload failed. Please try again.");
            }
          } else {
            Alert.alert("Error", "Please enter a valid MRP price.");
          }
      
      }


    




  };

  const selectFiles = () => {
    const options = {
      mediaType: "photo", // or "any" for all file types
      selectionLimit: 5, // Allow up to 5 files (adjust as needed)
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        // Set the selected files
        setSelectedFiles(response.assets || []);
      }
    });
  };
  const uploadFiles = async () => {


    try {

      const formData = new FormData();
      if (thumbnailImage) {

        formData.append("thumbnail_image", {
          //   uri: thumbnailImage.uri,
          //   type: thumbnailImage.type,
          //   name: "uploaded_image.jpg",
          uri: thumbnailImage.uri,
          type: thumbnailImage.type,
          name: thumbnailImage.fileName,
        });
      }
      formData.append("product_id", product?.id);
      // formData.append("discount", discount);
      formData.append("description", description);
      formData.append("mrp", discount);
      // formData.append("deletedImage",deletedImages )

      // Append each file to the FormData object

      images.forEach((file, index) => {
        formData.append("images[]", {
          uri: file.uri,
          type: file.type || "image/jpeg",
          name: file.fileName || `image_${index}.jpg`,
        });
      });
      // formData.append("image", {
      //   uri: thumbnailImage.uri,
      //   type: thumbnailImage.type,
      //   name: thumbnailImage.fileName ,
      // });

      const response = await axios.post(`${baseUrl}/updateProductDetailsexit2`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server Response:", response.message);
      // Alert.alert("Success", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
      Alert.alert("Error", "Failed to upload files.");
    }
  };

  useEffect(() => {
    if (product?.details) {
      setDescription(product.details.description || "");
      setDiscount(product.details.mrp || "");
      setExistingImages(product?.details?.image ? JSON.parse(product?.details?.image) : []);
      
    }
    // console.log(images,"images")
    return () => {
      setSelectedFiles([]);
      setImages([]);
      setThumbnailImage(null);
      setSelectedDeleteIMage(null);
      setIndexSelectedDeleteIMage(null);
    }
   
  }, [product]);
  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          <View>
            <Header isCart={true} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDescription}
              value={description}
              placeholder="Enter Description"
            />
            <Text style={styles.label}>MRP</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              onChangeText={setDiscount}
              value={discount}
              placeholder="Enter MRP"
            />
            <Text style={styles.label}>Thumbnail Image</Text>
            <TouchableOpacity style={styles.thumbnailButton} onPress={handleThumbnailSelection}>
              <Icon name="image" size={20} color="#fff" />
              <Text style={styles.thumbnailButtonText}>Select Thumbnail Image</Text>
            </TouchableOpacity>
            {thumbnailImage ? (
              <Image source={{ uri: thumbnailImage.uri }} style={styles.thumbnailImage} />
            ) : product?.details?.thumbnail_image ? (
              <Image source={{ uri: product?.details?.thumbnail_image }} style={styles.thumbnailImage} />
            ) : null}
            <Text style={styles.label}>Images (Multiple)</Text>
            {images.length === 0 && (
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleImageSelection} style={styles.iconButton}>
                  <Icon name="image" size={30} color="#fff" />
                  <Text style={styles.iconButtonText}>Select Images</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCameraSelection} style={styles.iconButton}>
                  <View style={styles.cameraIconContainer}>
                    <Icon name="camera" size={30} color="#fff" />
                    <Icon name="plus" size={15} color="#fff" style={styles.plusIcon} />
                  </View>
                  <Text style={styles.iconButtonText}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            )}
            {(images.length > 0 || existingImages.length > 0) && (
              <ScrollView horizontal style={styles.imageScrollContainer}>
                {images.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(index)}>
                      <Icon name="trash" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
                {Array.isArray(existingImages)&& existingImages.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.selectedImage} />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteExistingImage(index, image)}>
                      <Icon name="trash" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))} 
            

              </ScrollView>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={uploadImage}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {showModal &&
      
      <Warnning
       showModal={showModal}
       onClick={()=>{
        setshowModal(false);
        deleteServerImage()
       
       }}

       setshowModal={setshowModal} 
       
       />
      }
    </>
  );
};

const styles = {
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
  cameraIconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    position: "absolute",
    top: -5, // Adjust this value to position the + icon correctly
    right: -5, // Adjust this value to position the + icon correctly
  },
};

export default ProductForm;
