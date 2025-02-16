import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import { CartContext } from "../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  decreaseCartRow,
  increseCartRow,
  removeSelectedCart,
} from "../../reducers/UiReducer";

const CartScreen = () => {
  const { banner, login } = useSelector((state) => state.home);
  const { cart, totalQuantity, totalPrice } = useSelector((state) => state.ui);
  const [qt, setQt] = useState(cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // console.log(cart,'op')
  const handleDeleteItem = async (id) => {
    await deleteCartItem(id);
  };
  const total = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.sale_price;
  }, 0);
  const handleIncrease = (item) => {
    // setQt((prevProducts) =>
    //   prevProducts.map((product) =>
    //     product?.id === id && product?.qnty < product.purchase_qty
    //       ? { ...product, qnty: product?.qnty + 1 }
    //       : product
    //   )
    // );

    dispatch(increseCartRow(item));
  };
  const handleDecrease = (item) => {
    // setQt((prevProducts) =>
    //   prevProducts.map((product) =>
    //     product.id === id && product?.qnty > 1
    //       ? { ...product, qnty: product?.qnty - 1 }
    //       : product
    //   )
    // );
    dispatch(decreaseCartRow(item));
  };
  // //  console.log("qt", qt);
  //  console.log("Total", Number(Math.round(total)));
  return (
    <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
      <View style={styles.header}>
        <Header isCart={true} name={"Cart"} />
      
      </View>
      <FlatList
        data={cart?.length > 0 ? cart : []}
        renderItem={({ item, index }) => (
          <>
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
                    onPress={() => handleDecrease(item)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{cart[index]?.qnty}</Text>
                  <TouchableOpacity
                    onPress={() => handleIncrease(item)}
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
          </>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 200 }}
        ListFooterComponent={
          <>
            {cart?.length > 0 ? (
              <>
                <View style={styles.bottomContentContainer}>
                  <View style={styles.flexRowContainer}>
                    <Text style={styles.titleText}>Total:</Text>
                    <Text style={styles.priceText}>
                      {` Rs ${Number(
                        Math.round(
                          Number(
                            cart.reduce((accumulator, currentValue) => {
                              return (
                                accumulator +
                                parseFloat(
                                  Number(currentValue.sale_price) *
                                    Number(currentValue.qnty)
                                )
                              );
                            }, 0)
                          )
                        )
                      )}`}
                    </Text>
                  </View>
                  <View style={styles.flexRowContainer}>
                    <Text style={styles.titleText}>Shipping:</Text>
                    <Text style={styles.priceText}>Rs 0.0</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.flexRowContainer}>
                    <Text style={styles.titleText}>Grand Total:</Text>
                    <Text style={[styles.priceText, styles.grandPriceText]}>
                      {` Rs ${Number(
                        Math.round(
                          Number(
                            cart.reduce((accumulator, currentValue) => {
                              return (
                                accumulator +
                                parseFloat(
                                  Number(currentValue.sale_price) *
                                    Number(currentValue.qnty)
                                )
                              );
                            }, 0)
                          )
                        )
                      )}`}
                    </Text>
                  </View>
                </View>
                {login?.result?.role === "salesman" && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("Order", { cartArray: cart })
                    }
                  >
                    <Text style={styles.buttonText}>Checkout</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View></View>
            )}
          </>
        }
        ListEmptyComponent={
          <View style={styles.noProductContainer}>
            <Text style={styles.noProductText}>Empty Cart</Text>
          </View>
        }
      />
    </LinearGradient>
  );
};

export default CartScreen;

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
    // fontFamily: fonts.medium,
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
