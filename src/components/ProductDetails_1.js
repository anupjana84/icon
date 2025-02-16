import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

import fashion from "../assets/playstore.png";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // FontAwesome for call icon

const ProductDetails_1 = ({ product }) => {
  const navigation = useNavigation();
  //  console.log("product", product);
  const handleCall = (phone) => {
    const phoneNumber = `tel:+91${phone}`; // Make sure it's formatted correctly
    Linking.openURL(phoneNumber).catch((err) => {
      console.error("Error opening dialer", err);
    });
  };
  return (
    <View style={styles.mainContent}>
      {/* <ImageBackground style={styles.imgBackground} source={fashion}>
        <View style={styles.iconFlex}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto
              name="angle-left"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Entypo
            name="dots-three-vertical"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>
      </ImageBackground> */}
      {/* <View style={styles.flexHerat}>
        <View style={styles.heartBack}>
          <AntDesign
            name="hearto"
            size={24}
            color="#F33A6A"
            style={styles.icon}
          />
        </View>
      </View> */}

      <View style={styles.electContainer}>
        <View style={styles.electronic}>
          <Text style={styles.electronic}> {`${product.category?.name} `}</Text>
        </View>
      </View>

      <View style={styles.appleContainer}>
        <Text style={styles.appleText}>
          {" "}
          {`${product.category?.name} ${product.brand?.name}`}
        </Text>
        <Text style={styles.lorem}>{product.details?.description}</Text>
      </View>

      <View style={styles.ratingFlex}>
        {/* <View>
          <View style={styles.starFlex}>
            <Entypo
              style={styles.oneDesign}
              size={20}
              color="orange"
              name="star"
              accessibilityLabel="Back"
            />
            <Entypo
              style={styles.oneDesign}
              size={20}
              color="orange"
              name="star"
              accessibilityLabel="Back"
            />
            <Entypo
              style={styles.oneDesign}
              size={20}
              color="orange"
              name="star"
              accessibilityLabel="Back"
            />
            <Entypo
              style={styles.oneDesign}
              size={20}
              color="orange"
              name="star"
              accessibilityLabel="Back"
            />
          </View>

          <View>
            <Text style={styles.reviews}>(256 Reviews)</Text>
          </View>
        </View> */}

        {/* <View style={styles.flexColor}>
          <View style={styles.colorBrownTemplate}></View>
          <View style={styles.colorGreenTemplate}></View>
          <View style={styles.colorBlueTemplate}></View>
          <View style={styles.colorOrangeTemplate}></View>
        </View> */}
      </View>

      <View style={styles.appleContainer}>
        <Text style={styles.appleText}>Specifications</Text>
      </View>

      <View style={styles.BrandContainer}>
        <View style={styles.flexBrand}>
          <Text style={styles.brand}>Brand</Text>
          <Text style={styles.brandDetails}>{`${product.brand?.name}`}</Text>
        </View>
        <View style={styles.flexBrand}>
          <Text style={styles.brand}>Model</Text>
          <Text style={styles.brandDetails}>{`${product?.model}`}</Text>
        </View>
        <View style={styles.flexBrand}>
          <Text style={styles.brand}>Points</Text>
          <Text style={styles.brandDetails}>{`${product?.point}`}</Text>
        </View>
        <View style={styles.flexBrand}>
          <Text style={styles.brand}>Free Delivery</Text>
          <Text style={styles.brandDetails}>{`${
            product?.free_delivery === "no" ? "No" : "Yes"
          }`}</Text>
        </View>
        <View style={styles.flexBrand}>
          <Text style={styles.brand}>Category</Text>
          <Text style={styles.SleepDetails}>{`${product.category?.name}`}</Text>
        </View>
        <View style={styles.flexBrand}>
          <Text style={styles.brand}>Phone</Text>
          <View style={{ display: "flex" }}>
            <TouchableOpacity
              onPress={() => handleCall(product?.details?.phone)}
            >
              <Icon name="phone" size={30} color="#007C84" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.appleContainer}>
        {/* <Text style={styles.appleText}>Description</Text>
        <Text style={styles.Descriptionlorem}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          dolorum inventore, consectetur maxime quod a molestias
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: "white",
  },
  imgBackground: {
    height: 300,
    padding: 20,
  },
  iconFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    fontWeight: "bold",
  },
  heartBack: {
    backgroundColor: "#fde9f0",
    padding: 20,
    borderRadius: 50,
  },
  flexHerat: {
    flexDirection: "row",
    position: "relative",
    paddingRight: 20,
    justifyContent: "flex-end",
    bottom: 20,
  },
  electronic: {
    backgroundColor: "#fde9f0",

    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,

    borderRadius: 20,
    color: "#F33A6A",
    fontSize: 19,
  },
  electContainer: {
    flexDirection: "row",
    paddingLeft: 18,
    marginTop: 10,
  },
  flexBrand: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  appleContainer: {
    paddingLeft: 17,
    marginTop: 10,
  },
  appleText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  lorem: {
    marginTop: 8,
    fontSize: 15,
  },
  Descriptionlorem: {
    marginTop: 8,
    fontSize: 15,
    paddingBottom: 80,
  },
  ratingFlex: {
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgb(208 208 208)",
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  starFlex: {
    flexDirection: "row",
    marginTop: 12,
  },
  reviews: {
    marginTop: 5,
  },
  colorBrownTemplate: {
    backgroundColor: "#a39696",
    padding: 10,
    borderRadius: 15,
    marginLeft: 15,
  },
  colorGreenTemplate: {
    backgroundColor: "#82c5a9",
    padding: 10,
    borderRadius: 15,
    marginLeft: 15,
  },
  colorBlueTemplate: {
    backgroundColor: "#8e83d0",
    padding: 10,
    borderRadius: 15,
    marginLeft: 15,
  },
  colorOrangeTemplate: {
    backgroundColor: "#e4927c",
    padding: 10,
    borderRadius: 15,
    marginLeft: 15,
  },
  flexColor: {
    flexDirection: "row",
  },
  BrandContainer: {
    marginTop: 10,
    paddingLeft: 17,
    borderBottomColor: "rgb(208 208 208)",
    borderBottomWidth: 1,
    paddingRight: 17,
    paddingBottom: 15,
  },

  brand: {
    color: "black",
    fontSize: 17,
  },
  brandDetails: {
    // color: 'black',
    fontSize: 16,
  },
  SleepDetails: {
    color: "#F33A6A",
    fontSize: 16,
  },
});

export default ProductDetails_1;
