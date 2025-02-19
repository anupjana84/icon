import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  ScrollView,
  Linking,
} from "react-native";
import React, { useContext, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addToCart } from "../utils/helper";
import { CartContext } from "../context/CartContext";
import CarouselProduct from "../components/CarouselProduct";
import { useDispatch, useSelector } from "react-redux";
import { addCartRow } from "../../reducers/UiReducer";
import call from "react-native-phone-call"; // Phone call package
import Icon from "react-native-vector-icons/FontAwesome"; // FontAwesome for call icon
import ProductDetails_1 from "../components/ProductDetails_1";
import ProductDetailsPrice from "../components/ProductDetailsPrice";

const ProductDetail = () => {
  const { addToCartItem } = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route.params.item;
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");
  const { cart } = useSelector((state) => state.ui);
  const { login } = useSelector((state) => state.home);
  // console.log(product,'pr')

  const productDetails = useSelector((state) => state.productDetails);
 
  const imageUrl =
    "https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/vulb5bckiruhpzt2v8ec.png";
  //  console.log("product", product);
  const handleAddToCart = () => {

    const data = Number(
      Math.round(
        Number(product?.sale_price) +
        Number(Number(product?.sale_price) * (product?.category?.gst)) /
        100
      )
    );
    //  console.log(data)
    const productdata = {
      ...product,
      sale_price: data,
    }
    dispatch(addCartRow(productdata));
    navigation.navigate("CART");
  };

  const handleCall = (phone) => {
    const phoneNumber = `tel:+91${phone}`; // Make sure it's formatted correctly
    Linking.openURL(phoneNumber).catch((err) => {
      console.error("Error opening dialer", err);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#88dae0" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Header
            isCart={true}
            name={`${product.category?.name} ${product.brand?.name}`}
          />
        </View>
        <View style={styles.imageContainer}>
        {product?.details?.thumbnail_image && product?.details?.image ? (
    <CarouselProduct
      images={[
        ...(Array.isArray(JSON.parse(product.details.image))
          ? JSON.parse(product.details.image)
          : []),
        product.details.thumbnail_image,
      ].filter(Boolean)} // Remove any undefined or null values
    />
  ) : null}

        </View>
        <ProductDetails_1 product={product} />
      </ScrollView>
      <View style={styles.priceContainer}>
        <ProductDetailsPrice
          product={product}
          login={login}
          handleAddToCart={handleAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    height: 420,
    width: "100%",
  },
  contentContainer: {
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  sizeText: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007C84",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
  callButtonContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 70, // Add padding to ensure the scrollable content doesn't overlap with the bottom component
  },
  priceContainer: {
    paddingBottom: 76,
    paddingLeft: 15,
    borderTopColor: "rgb(208 208 208)",
    borderTopWidth: 1,
    height: 70,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#aceff4", // Add a background to make the component stand out
    padding: 10,
    elevation: 5, // Add a shadow for better visibility
  },
});

export default ProductDetail;
