import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import CarouselProduct from "../components/CarouselProduct";
import ProductDetails_1 from "../components/ProductDetails_1";
import ProductDetailsPrice from "../components/ProductDetailsPrice";
import { useDispatch, useSelector } from "react-redux";
import { addCartRow } from "../../reducers/UiReducer";
import HeaderQr from "../components/HearderQr";

const ProductQRDetail = () => {
  const { addToCartItem } = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.item;
  const { login, } = useSelector((state) => state.home);
  const dispatch = useDispatch();

 
  const images = (() => {
    try {
      if (
        typeof product?.details?.image === "string" &&
        product?.details?.image.trim() !== ""
      ) {
        return JSON.parse(product?.details?.image);
      }
    } catch (error) {
      console.error("Failed to parse images:", error);
    }
    return [];
  })();

  const handleAddToCart1 = () => {
    const data = Number(
      Math.round(
        Number(product?.sale_price) +
          (Number(product?.sale_price) * (product?.category?.gst || 0)) /
            100
      )
    );
    const productdata = {
      ...product,
      sale_price: data,
    };
    dispatch(addCartRow(productdata));
    navigation.navigate("CART");
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Landing");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [navigation]);

 

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <HeaderQr
              isCart={true}
              name={`${product.category?.name} ${product.brand?.name}`}
            />
          </View>
          <View style={styles.imageContainer}>
            <CarouselProduct images={images.length > 0 ? images : []} />
          </View>
          <ProductDetails_1 product={product} />
        </ScrollView>
     
        <View style={styles.priceContainer}>
        <ProductDetailsPrice
          product={product}
          login={login}
          handleAddToCart={handleAddToCart1}
        />
      </View>
        
      </View>
    </>
  );
};

export default ProductQRDetail;

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