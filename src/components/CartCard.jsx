import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { fonts } from "../utils/fonts";
import { useDispatch } from "react-redux";
import { removeSelectedCart } from "../../reducers/UiReducer";

const CartCard = ({
  item,
  handleDelete,
  handleQuantityChange,
  cart,
  index,
  qt,
  setQt,
}) => {
  const dispatch = useDispatch();

  // //  console.log("qt", qt);
  const handleIncrease = (id) => {
    setQt((prevProducts) =>
      prevProducts.map((product) =>
        product?.id === id && product?.qnty < product.purchase_qty
          ? { ...product, qnty: product?.qnty + 1 }
          : product
      )
    );
  };
  const handleDecrease = (id) => {
    setQt((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product?.qnty > 1
          ? { ...product, qnty: product?.qnty - 1 }
          : product
      )
    );
  };
  return (
    <View style={styles.card}>
      {/* Product Image */}
      <Image
        source={{ uri: item.details?.thumbnail_image }}
        style={styles.image}
      />
      {/* Product Details */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {`${item.category?.name} ${item.brand?.name}`}
        </Text>
        <Text style={styles.price}>Rs {item.sale_price}</Text>
        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecrease(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{qt[index]?.qnty}</Text>
          <TouchableOpacity
            onPress={() => handleIncrease(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => dispatch(removeSelectedCart(item))}
        style={styles.deleteButton}
      >
        <Image
          source={require("../assets/deleteIcon.png")}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fonts.medium,
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#27ae60",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  colorCircle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    marginRight: 15,
  },
  sizeContainer: {
    backgroundColor: "#f2f2f2",
    height: 25,
    width: 50,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  deleteIcon: {
    height: 24,
    width: 24,
    tintColor: "#e74c3c",
  },
});
