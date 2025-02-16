import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  salemanpayDispatch,
  showCustomerDispatch,
} from "../../reducers/HomeReducer";

const AllCustomer = () => {
  const { orderAll, salespayment, allCustomer, sales, login } = useSelector(
    (state) => state.home
  );
  //  console.log("sales", sales);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showCustomerDispatch(login?.token));
  }, []);
  let data = [];
  if (allCustomer?.length > 0) {
    allCustomer?.map((i) => {
      if (i.salesman_id === login?.salesman?.id) {
        data.push({
          ...i,
        });
      }
    });
  }
  const renderOrderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Name: {item.name}</Text>
        <Text>Phone: {item.phone || "N/A"}</Text>
        <Text>Address: {item.address}</Text>
        <Text>Pin: {item.pin}</Text>
        <Text>created At: {item.created_at.split("T")[0]}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header isCart={true} name={"All Customers"} />
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

export default AllCustomer;
