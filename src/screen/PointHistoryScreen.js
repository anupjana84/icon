import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  salemanpayDispatch,
  salemanPointDispatch,
} from "../../reducers/HomeReducer";

const PointHistoryScreen = () => {
  const { orderAll, salespayment, salespoint, sales, login } = useSelector(
    (state) => state.home
  );
  //  console.log("sales", sales);
  const dispatch = useDispatch();
  // console.log(login)
  useEffect(() => {
    dispatch(salemanPointDispatch(login?.token,login?.salesman?.id));
  }, []);
  let data = [];
  console.log(salespoint)
  // if (salespoint?.length > 0) {
  //   salespoint?.map((i) => {
  //     if (i.salesman_id === sales[0]?.id) {
  //       data.push({
  //         ...i,
  //       });
  //     }
  //   });
  // }
  const renderOrderItem = ({ item }) => {
    const formatDate = (date) => {
      const d = new Date(date); // Convert the input date string to a Date object
      const day = String(d.getDate()).padStart(2, '0'); // Day of the month (1-31)
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Month (0-indexed, so add 1)
      const year = String(d.getFullYear()).slice(-2); // Last two digits of the year
      return `${day}/${month}/${year}`; // Return formatted date as "DD MM YY"
    };
  
    return (
      <View style={styles.card}>
        <Text>Points: {item.points}</Text>
        <Text>Date: {formatDate(item.date)}</Text> 
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header isCart={true} name={"Point History"} />
      <View style={{ marginTop: 10 }}></View>
      <FlatList
        data={salespoint}
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

export default PointHistoryScreen;
