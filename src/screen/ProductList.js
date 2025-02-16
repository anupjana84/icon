import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import { CartContext } from "../context/CartContext";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import ProductNewCard from "../components/ProductNewCard";
import {
  productAllDispatch,
  productDispatch,
  productsearchDispatch,
  productSuccess,
  psearchSuccess,
} from "../../reducers/HomeReducer";
import Tags from "../components/Tags";
import {Card} from 'react-native-shadow-cards';
const ProductList = () => {
  const { productAll, psearch, pc } = useSelector((state) => state.home);
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAllDispatch());
  }, []);
  const handleChange = () => {
    //  console.log("d", data);
    if (data) {
      dispatch(productSuccess(null));
      dispatch(productsearchDispatch(data));
    } else {
      dispatch(productDispatch());
      dispatch(psearchSuccess(null));
    }
  };
  // //  console.log("product", product);
  const handleDeleteItem = async (id) => {
    await deleteCartItem(id);
  };
  return (
    <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
    <>
      <View style={styles.header}>
        <Header isCart={true} name={"All Product"} />
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
      <FlatList
        data={psearch ? psearch?.data : pc ? pc?.data : productAll?.data}
        ListHeaderComponent={
          <>
            <Tags />
          </>
        }
        renderItem={({ item }) => (
          // <View
          // style={{backgroundColor: 'white',
          //   borderRadius: 15,
          //   padding: 16,
          //   shadowColor: 'black',
          //   shadowOffset: {
          //       width: 0,
          //       height: 4,
          //   },
          //   shadowOpacity: 0.3,
          //   shadowRadius: 6,
          //   elevation: 14,
          //   width: 350,
          //   height: 350,
          //   margin: 10,
          //   justifyContent: 'center',
          //   alignItems: 'center',}}
          // ></View>
        //   <Card style={{padding: 10, margin: 10}}>
        //   <Text>Open up App.js to start working on your app!</Text>
        //   <Text>Changes you make will automatically reload.</Text>
        //   <Text>Shake your phone to open the developer menu.</Text>
        // </Card>
           <ProductNewCard item={item} handleDelete={handleDeleteItem} />
        )}
        ListEmptyComponent={
          <View style={styles.noProductContainer}>
            <Text style={styles.noProductText}>No Product Found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 200 }}
      />
 
    </>
    </LinearGradient>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  header: {},
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "600",
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
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    // marginBottom: 10,
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
