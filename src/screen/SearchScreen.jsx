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
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data/data.json";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../components/Carousel";

const SearchScreen = () => {
  const [products, setProducts] = useState(data.products);
  const navigation = useNavigation();
  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };
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
      <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
        {/* header */}

        {/* <Tags /> */}

        <FlatList
          ListHeaderComponent={
            <>
              <>
                <View style={styles.header}>
                  <Header isCart={true} />
                  <TextInput
                    placeholder="Search "
                    placeholderTextColor="#848484"
                    style={styles.textInput}
                  />
                </View>
              </>
            </>
          }
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              handleProductClick={handleProductDetails}
              toggleFavorite={toggleFavorite}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        <View>
          {/* <Text>HomeScreen</Text>
        <Text>HomeScreen</Text> */}
        </View>
      </LinearGradient>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
});
