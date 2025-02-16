import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { ordergetDispatch } from "../../reducers/HomeReducer";

// Sample JSON data

const OrderHistoryScreen = () => {
  const { orderAll, login } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  // console.log(orderAll,'orderall')
  useEffect(() => {
    dispatch(ordergetDispatch(login?.token, login?.salesman?.id));
  }, []);
  const renderOrderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Order ID: {item.id}</Text>
        <Text>Customer Name: {item.customer?.name || "N/A"}</Text>
        <Text>Shipping Address: {item.shipping_address}</Text>
        <Text>Shipping PIN: {item.shipping_pin}</Text>
        <Text>Order Status: {item.order_status}</Text>
        <Text>Delivery Date: {item.delivery_date || "Not Assigned"}</Text>
        <Text>Phone: {item.customer?.phone || "N/A"}</Text>
        <Text>
          Point:{" "}
          {Number(
            item?.order_items.reduce((accumulator, currentValue) => {
              return (
                accumulator + parseFloat(Number(currentValue.product.point))
              );
            }, 0)
          )}
        </Text>
      </View>
    );
  };
  //  console.log("orderAll", orderAll);
  return (
    <View style={styles.container}>
      <Header isCart={true} name={"Order History"} />
      <View style={{ marginTop: 10 }}></View>
      <FlatList
        data={orderAll?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default OrderHistoryScreen;
