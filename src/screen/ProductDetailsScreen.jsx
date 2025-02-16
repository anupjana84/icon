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

const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];

const ProductDetailsScreen = () => {
  const { addToCartItem } = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route.params.item;
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");
  const { cart } = useSelector((state) => state.ui);
  const { login } = useSelector((state) => state.home);
  const imageUrl =
    "https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/vulb5bckiruhpzt2v8ec.png";
  //  console.log("product", product);
  const handleAddToCart = () => {
    dispatch(addCartRow(product));
    navigation.navigate("CART");
  };

  const handleCall = (phone) => {
    const phoneNumber = `tel:+91${phone}`; // Make sure it's formatted correctly
    Linking.openURL(phoneNumber).catch((err) => {
      console.error("Error opening dialer", err);
    });
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
        <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
          <View style={styles.header}>
            <Header
              isCart={true}
              name={`${product.category?.name} ${product.brand?.name}`}
            />
          </View>
          <View style={styles.imageContainer}>
            <CarouselProduct
              images={[
                ...JSON.parse(product?.details?.image),
                product.details?.thumbnail_image,
              ]}
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.fontText}>
                {`${product.category?.name} ${product.brand?.name}`}
              </Text>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 20, color: "red" }}>
                    {" "}
                    {Number(
                      Math.round(
                        Number(
                          ((Number(product?.details?.mrp) -
                            (Number(product?.sale_price) +
                              (Number(product?.sale_price) *
                                Number(product?.category?.gst)) /
                                100)) /
                            Number(product?.details?.mrp)) *
                            100
                        )
                      )
                    )}
                    %
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 20,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {product.sale_price}{" "}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 20,
                    textDecorationLine: "line-through",
                  }}
                >
                  MRP ₹{product.details.mrp}{" "}
                </Text>
              </View>
            </View>
            <Text style={styles.fontText}>{`${product?.model}`}</Text>
            <Text style={styles.fontText}>{`${
              product?.free_delivery === "no" ? "" : "Free Delivery"
            }`}</Text>
            <Text style={styles.fontText}>GST {product.category.gst}% </Text>
            <Text style={[styles.fontText, styles.sizeText]}>
              {product?.details?.description}
            </Text>

            <View>
              {login?.result?.role === "salesman" && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Call Button */}
            <View style={styles.callButtonContainer}>
              <TouchableOpacity
                onPress={() => handleCall(product?.details?.phone)}
              >
                <Icon name="phone" size={30} color="#007C84" />
              </TouchableOpacity>
              {/* <Text style={{ fontSize: 20, color: "black" }}>Call</Text> */}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
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
});

export default ProductDetailsScreen;
