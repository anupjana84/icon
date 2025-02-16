import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../utils/fonts";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setProductDetails } from "../../reducers/ProductDetails";


const ProductNewCard = ({ item, handleDelete, handleQuantityChange }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
        <Text style={styles.title} numberOfLines={1}>
          {`${item.model} `}
        </Text>

        <Text>{item?.details?.description}</Text>
        <Text style={styles.price}>Rs {item.sale_price}</Text>
        {/* Quantity Controls */}
      </View>
      {/* Delete Button */}
      <TouchableOpacity
        onPress={() =>{
          dispatch(setProductDetails(item));
          navigation.navigate("EditProduct", { item })
          // setProductDetails(item);
        }  }
        style={styles.editButton}
      >
        <Icon name="edit" size={24} color="#3498db" />
      </TouchableOpacity>
    </View>
  );
};

export default ProductNewCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,

    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 5,
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
    marginTop: 10,
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
