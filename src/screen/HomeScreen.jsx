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
import { useNavigation } from "@react-navigation/native";
import Carousel from "../components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  productDispatch,
  productsearchDispatch,
  productSuccess,
  psearchSuccess,
} from "../../reducers/HomeReducer";
import Loader from "../components/Loader";

const HomeScreen = () => {
  // const [products, setProducts] = useState(data.products);
  const { product, pc, psearch, loading } = useSelector((state) => state.home);
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const handleChange = () => {
    //  console.log("d", data);
    if (data) {
      dispatch(productSuccess(null));
      dispatch(productsearchDispatch(data));
    } else {
      dispatch(psearchSuccess(null));
    }
  };
  useEffect(() => {
    dispatch(productDispatch());
  }, []);
  const navigation = useNavigation();
  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };
  // const toggleFavorite = (item) => {
  //   setProducts(
  //     products.map((prod) => {
  //       if (prod.id === item.id) {
  //         //  console.log("prod: ", prod);
  //         return {
  //           ...prod,
  //           isFavorite: !prod.isFavorite,
  //         };
  //       }
  //       return prod;
  //     })
  //   );
  // };
  //  console.log("pc", pc);
  //  console.log("psearch", psearch);
  //  console.log("product", product);
  return (
    <>
      <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
      <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
        {/* header */}

        {/* <Tags /> */}

        <FlatList
          ListHeaderComponent={
            <>
              <>
                {/* <Header /> */}
                <View>
                  <Text style={styles.headingText}>All Product</Text>
                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../assets/search.png")}
                      style={styles.searchIcon}
                    />
                    <TextInput
                      placeholder="Search"
                      style={styles.textInput}
                      onChangeText={setData}
                      onChange={handleChange}
                    />
                  </View>
                </View>
              </>
              <Tags />
            </>
          }
          data={psearch ? psearch?.data : pc ? pc?.data : product?.data}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              handleProductClick={handleProductDetails}
              // toggleFavorite={toggleFavorite}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noProductContainer}>
              <Text style={styles.noProductText}>No Product Found</Text>
            </View>
          }
        />
        <View>
          {/* <Text>HomeScreen</Text>
        <Text>HomeScreen</Text> */}
        </View>
      </LinearGradient>
    </>
  );
};

export default HomeScreen;

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
    color: "black",
  },
  noProductContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noProductText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
});
