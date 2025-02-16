import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setProductDetails } from "../../reducers/ProductDetails";

const ProductDetailsPrice = ({ product, login, handleAddToCart }) => {
  // console.log(product, "first");
  const navigation = useNavigation();
  const dispatch =useDispatch()
  return (
    <View style={styles.buyPrice}>
      <View>
        <Text style={styles.actualPrice}>
          ₹
          {Number(
            Math.round(
              Number(product?.sale_price) +
                Number(Number(product?.sale_price) * (product?.category?.gst)) /
                  100
            )
          )}
        </Text>
        <View style={styles.flexDis}>
          
          {product?.details?.mrp && 
          <>
          <Text style={styles.discountPrice}>₹ {product?.details?.mrp}</Text>
          <Text style={styles.PercentPrice}>
            {" "}
            
            {product?.details?.mrp &&`-${Number(
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
            )}`}
            % off
          </Text>
          </>
          }
          
        </View>
      </View>
      <View>
        {/* {login?.result?.role === "salesman" ? (
          <TouchableOpacity onPress={handleAddToCart}>
            <Text style={styles.buynowButton}>BUY NOW</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )} */}

        {login && login.result && login.result.role === "salesman" ? (
                  <TouchableOpacity onPress={handleAddToCart}>
                    <Text style={styles.buynowButton}>BUY NOW</Text>
                  </TouchableOpacity>
                ) : login && login.result && login.result.role === "manager" ? (
                  <TouchableOpacity onPress={() => {
                    dispatch(setProductDetails(product))
                   // navigation.navigate("EditProduct", { item: product })
                    navigation.navigate("ACCOUNT",{ screen: "EditProduct", params: { item: product }})
                  }}>
                    <Text style={styles.buynowButton}>EDIT NOW</Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buyPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "rgb(208 208 208)",
    height: 100,
  },
  buynowButton: {
    backgroundColor: "#fc4586",
    color: "white",
    paddingVertical: 14, // Vertical padding
    paddingHorizontal: 22, // Horizontal padding
    fontSize: 18,
    borderRadius: 10,
  },

  flexDis: {
    flexDirection: "row",
  },
  discountPrice: {
    textDecorationLine: "line-through",
  },
  PercentPrice: {
    marginLeft: 5,
    fontWeight: "600",
    color: "#F33A6A",
    fontSize: 15,
  },
  actualPrice: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
  },
});
export default ProductDetailsPrice;
