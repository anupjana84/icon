import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  ScrollView,
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

const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];

const ProductDetail = () => {
  const { addToCartItem } = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route.params.item;
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");
  const { cart } = useSelector((state) => state.ui);
  const imageUrl =
    "https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/vulb5bckiruhpzt2v8ec.png";
  //  console.log("cart", cart);
  const handleAddToCart = () => {
    dispatch(addCartRow(product));
    // product.color = selectedColor;
    // product.size = selectedSize;
    // addToCartItem(product);
    navigation.navigate("CART");
  };
  //  console.log("product", product);
  //  console.log("anup", product);
  return (
    <>
      <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
      <ScrollView>
        <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
          <View style={styles.header}>
            <Header
              isCart={true}
              name={`${product.category?.name} ${product.brand?.name}`}
            />
          </View>
          <View style={styles.imageContainer}>
            {/* <Image
            source={{ uri: product.details?.thumbnail_image }}
            style={styles.coverImage}
          /> */}
            {/* <CarouselProduct images={JSON.parse(product?.details?.image)} /> */}
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.fontText}>
                {`${product.category?.name} ${product.brand?.name}`}
              </Text>
              <Text style={styles.fontText}>Rs {product.sale_price} </Text>
            </View>
            <Text style={[styles.fontText, styles.sizeText]}>
              {product?.details?.description}
            </Text>
            {/* size container */}
            {/* <View style={styles.sizeContainer}>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("S")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "S" && styles.selectedText,
                ]}
              >
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("M")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "M" && styles.selectedText,
                ]}
              >
                10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("L")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "L" && styles.selectedText,
                ]}
              >
                15
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("XL")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "XL" && styles.selectedText,
                ]}
              >
                20
              </Text>
            </TouchableOpacity>
          </View> */}
            {/* color container */}
            {/* <View style={styles.colorContainer}>
          {colorsArray.map((color, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedColor(color)}
              >
                <View
                  style={[
                    styles.borderColorCircle,
                    selectedColor === color && {
                      borderColor: color,
                      borderWidth: 2,
                      borderRadius: 24,
                    },
                  ]}
                >
                  <View
                    style={[styles.colorCircle, { backgroundColor: color }]}
                  ></View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View> */}
            {/* cart button */}
            {/* <View style={styles.inputContainer}>
           
            <TextInput placeholder="Add Custom Size" style={styles.textInput} />
          </View> */}
            <View>
              <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default ProductDetail;

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
  coverImage: {
    resizeMode: "cover",
    flex: 1,
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
    color: "#444444",
  },
  sizeText: {
    marginTop: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: "700",
  },
  selectedText: {
    color: "#E55B5B",
  },
  colorContainer: {
    flexDirection: "row",
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  button: {
    backgroundColor: "#88dae0",
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
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
});
