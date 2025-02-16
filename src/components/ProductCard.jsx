import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../utils/fonts";

const ProductCard = ({ item, handleProductClick, toggleFavorite }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleProductClick(item)}
    >
      {/* Product Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.details?.thumbnail_image }}
          style={styles.coverImage}
        />
        {/* Favorite Button */}
        {/* <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={styles.favoriteButton}
        >
          <Image
            source={
              item.isFavorite
                ? require("../assets/favoriteFilled.png")
                : require("../assets/favorite.png")
            }
            style={styles.favoriteIcon}
          />
        </TouchableOpacity> */}
      </View>
      {/* Product Details */}
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {`${item.category?.name} ${item.brand?.name}`}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {`${item.model} `}
        </Text>
        <Text style={styles.price}>Rs {item.sale_price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    overflow: "hidden",
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
  },
  imageWrapper: {
    position: "relative",
  },
  coverImage: {
    height: 150,
    width: "100%",
    resizeMode: "stretch",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  favoriteIcon: {
    height: 24,
    width: 24,
    tintColor: "#e74c3c",
  },
  contentContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: fonts.regular,
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: fonts.medium,
    color: "#27ae60",
  },
});
