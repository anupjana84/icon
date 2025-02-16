import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import { useSelector } from "react-redux";


const Category = ({ closeDrawer }) => {
  const navigation = useNavigation();
  const { category } = useSelector((state) => state.home);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.conatiner}
    >
      {category?.result?.map((i, index) => {
        return (
          <TouchableOpacity
            key={index + 1}
            style={styles.category}
            onPress={() => {
              navigation.navigate("Product", { id: i.id });
              closeDrawer();
            }}
          >
            <Image
              source={{
                uri: i.image,
              }}
              style={styles.imgStyle}
            />
            <Text style={styles.title}>{i.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "#FFFFFFFF",
    padding: 10,
  },
  imgStyle: {
    height: 40,
    width: 40,
    marginBottom: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    color: "#2c4341",
  },
  category: {
    paddingHorizontal: 8,
    alignItems: "center",
  },
  header: {
    padding: 15,
  },
});

export default Category;
