import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pcategorySuccess,
  productcategoryDispatch,
  productDispatch,
  psearchSuccess,
} from "../../reducers/HomeReducer";

const Tags = () => {
  const { category } = useSelector((state) => state.home);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  //  console.log("category", category);
  const tags = [{ id: "", name: "All" }];
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={[...tags, ...category?.result]}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.name === "All") {
                  dispatch(productDispatch());
                  dispatch(psearchSuccess(null));
                  dispatch(pcategorySuccess(null));
                  setSelected(item.name);
                } else {
                  dispatch(productcategoryDispatch(item.id));
                  dispatch(psearchSuccess(null));
                  setSelected(item.name);
                }
              }}
            >
              <Text
                style={[
                  styles.tagText,
                  item.name === selected ? styles.isSelected : null,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tagText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#DFDCDC",
    color: "#938F8F",
    fontWeight: "700",
  },
  isSelected: {
    backgroundColor: "#88dae0",
    color: "#FFFFFF",
  },
  container: {
    marginVertical: 10,
  },
});
