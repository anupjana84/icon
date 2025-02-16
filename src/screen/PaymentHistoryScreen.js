import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { salemanpayDispatch } from "../../reducers/HomeReducer";

// Sample JSON data
const orderData = [
  {
    id: 1,
    customer_id: 11,
    shipping_address: "hjhjmhj",
    shipping_pin: "hjhjhyk",
    order_status: "pending",
    notes: null,
    deleted_at: null,
    created_at: null,
    updated_at: null,
    delivery_date: "2024-12-17",
    customer: {},
  },
  {
    id: 2,
    customer_id: 14,
    shipping_address: "WB",
    shipping_pin: "859645",
    order_status: "pending",
    notes: null,
    deleted_at: null,
    created_at: "2024-12-10T01:58:58.000000Z",
    updated_at: "2024-12-10T01:58:58.000000Z",
    delivery_date: null,
    customer: {
      id: 14,
      salesman_id: 3,
      name: "Nitish",
      phone: "1234567895",
      wpnumber: "1234567895",
      address: "WB",
      pin: "859645",
      sales_ids: null,
      deleted_at: null,
      created_at: "2024-12-10T01:58:57.000000Z",
      updated_at: "2024-12-10T01:58:57.000000Z",
    },
  },
  {
    id: 2,
    customer_id: 14,
    shipping_address: "WB",
    shipping_pin: "859645",
    order_status: "pending",
    notes: null,
    deleted_at: null,
    created_at: "2024-12-10T01:58:58.000000Z",
    updated_at: "2024-12-10T01:58:58.000000Z",
    delivery_date: null,
    customer: {
      id: 14,
      salesman_id: 3,
      name: "Nitish",
      phone: "1234567895",
      wpnumber: "1234567895",
      address: "WB",
      pin: "859645",
      sales_ids: null,
      deleted_at: null,
      created_at: "2024-12-10T01:58:57.000000Z",
      updated_at: "2024-12-10T01:58:57.000000Z",
    },
  },
  {
    id: 2,
    customer_id: 14,
    shipping_address: "WB",
    shipping_pin: "859645",
    order_status: "pending",
    notes: null,
    deleted_at: null,
    created_at: "2024-12-10T01:58:58.000000Z",
    updated_at: "2024-12-10T01:58:58.000000Z",
    delivery_date: null,
    customer: {
      id: 14,
      salesman_id: 3,
      name: "Nitish",
      phone: "1234567895",
      wpnumber: "1234567895",
      address: "WB",
      pin: "859645",
      sales_ids: null,
      deleted_at: null,
      created_at: "2024-12-10T01:58:57.000000Z",
      updated_at: "2024-12-10T01:58:57.000000Z",
    },
  },
  {
    id: 2,
    customer_id: 14,
    shipping_address: "WB",
    shipping_pin: "859645",
    order_status: "pending",
    notes: null,
    deleted_at: null,
    created_at: "2024-12-10T01:58:58.000000Z",
    updated_at: "2024-12-10T01:58:58.000000Z",
    delivery_date: null,
    customer: {
      id: 14,
      salesman_id: 3,
      name: "Nitish",
      phone: "1234567895",
      wpnumber: "1234567895",
      address: "WB",
      pin: "859645",
      sales_ids: null,
      deleted_at: null,
      created_at: "2024-12-10T01:58:57.000000Z",
      updated_at: "2024-12-10T01:58:57.000000Z",
    },
  },
  {
    id: 2,
    customer_id: 14,
    shipping_address: "WB",
    shipping_pin: "859645",
    order_status: "pending",
    notes: null,
    deleted_at: null,
    created_at: "2024-12-10T01:58:58.000000Z",
    updated_at: "2024-12-10T01:58:58.000000Z",
    delivery_date: null,
    customer: {
      id: 14,
      salesman_id: 3,
      name: "Nitish",
      phone: "1234567895",
      wpnumber: "1234567895",
      address: "WB",
      pin: "859645",
      sales_ids: null,
      deleted_at: null,
      created_at: "2024-12-10T01:58:57.000000Z",
      updated_at: "2024-12-10T01:58:57.000000Z",
    },
  },
];

const PaymentHistoryScreen = () => {
  const { orderAll, salespayment, sales,login } = useSelector((state) => state.home);
  //  console.log("salespayment", salespayment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(salemanpayDispatch());
  }, []);
  let data = [];
  if (salespayment?.length > 0) {
    salespayment?.map((i) => {
      if (i?.salesman_id === login?.salesman?.id) {
        data.push({
          ...i,
        });
      }
    });
  }
  const renderOrderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>ID: {item.id}</Text>
        <Text>Amount: {item.amount || "N/A"}</Text>
        <Text>Remaining Points: {item.remaining_points}</Text>
        <Text>Payment Date: {item.payment_date.split("T")[0]}</Text>
        <Text>Payment Method: {item.payment_method}</Text>
        <Text>Note: {item.note}</Text>
        <Text>Created At: {item.created_at.split("T")[0]}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header isCart={true} name={"Payment History"} />
      <View style={{ marginTop: 10 }}></View>
      {data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrderItem}
        />
      ) : (
        <View>
          <Text style={{ textAlign: "center" }}>No record Found</Text>
        </View>
      )}
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

export default PaymentHistoryScreen;
