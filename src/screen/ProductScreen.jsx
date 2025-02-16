import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data/data.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "../components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  productcategoryDispatch,
  productDispatch,
} from "../../reducers/HomeReducer";
import Loader from "../components/Loader";

import { setProductDetails } from "../../reducers/ProductDetails";
const ProductScreen = () => {
  const [products, setProducts] = useState(data.products);
  const route = useRoute();
  const id = route.params.id;
  //  console.log("first", id);
  const navigation = useNavigation();
  const { pc, loading } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(productDispatch());
    dispatch(productcategoryDispatch(id));
  }, []);
  const handleProductDetails = (item) => {
    
     dispatch(setProductDetails(item));

    navigation.navigate("PRODUCT_DETAILS", { item });
  };
    // console.log("pc", pc.data);
  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          //  console.log("prod: ", prod);
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
          <FlatList
            ListHeaderComponent={
              <>
                <>
                  {/* <View style={styles.header}> */}
                  <Header isCart={true} name={"Product"} />
                  {/* </View> */}
                </>
              </>
            }
            data={pc?.data}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                handleProductClick={handleProductDetails}
                toggleFavorite={toggleFavorite}
              />
            )}
            ListEmptyComponent={
              <View style={styles.noProductContainer}>
                <Text style={styles.noProductText}>No products found</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
          <View></View>
        </LinearGradient>
      )}
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  header: {
    padding: 15,
  },
  noProductContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  noProductText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
});
