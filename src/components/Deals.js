import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// import RecommendProduct from '../../assets/images/slider_3.jpg';

const Deals = ({ item }) => {
  const navigation = useNavigation();
  //  console.log("item", item);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PRODUCT_DETAILS", { item })}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: item?.details?.thumbnail_image,
          }}
          style={styles.imgStyle}
        />
        <View style={styles.bottomSection}>
          <View style={styles.row}>
            <Text style={{ color: "black", marginRight: 5 }}>
              {`${item.category?.name} ${item.brand?.name}`}
            </Text>
            <TouchableOpacity style={styles.offDealBtn}>
              <Text style={styles.offDeal}>
                {/* {Number(
                  Math.round(
                    Number(
                      ((item?.details?.mrp -
                        Number(item?.sale_price) +
                        Number(Number(item?.sale_price) * 0.18)) /
                        item?.details?.mrp) *
                        100
                    )
                  )
                )} */}
                {`-${Number(
                  Math.round(
                    Number(
                      ((Number(item?.details?.mrp) -
                        (Number(item?.sale_price) +
                          (Number(item?.sale_price) *
                            Number(item?.category?.gst)) /
                            100)) /
                        Number(item?.details?.mrp)) *
                        100
                    )
                  )
                )}`}
                % off
              </Text>
            </TouchableOpacity>
            <Text style={styles.deal}>Deal</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.discountPrice}>
              ₹
              {Number(
                Math.round(
                  Number(item?.sale_price) +
                    Number(Number(item?.sale_price) * 0.18)
                )
              )}
            </Text>
            <Text style={styles.mrp}>M.R.P.</Text>
            <Text style={styles.actualPrice}>₹ {item?.details?.mrp}</Text>
          </View>
          <Text style={styles.productName}>{item?.description}</Text>
          <Text style={styles.allDeals}>See all deals</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 10,
  },
  imgStyle: {
    height: 250,
    width: "100%",
    marginVertical: 10,
    resizeMode: "contain",
  },
  bottomSection: {
    paddingHorizontal: 10,
  },
  offDealBtn: {
    backgroundColor: "#be0201",
    width: 60,
    alignItems: "center",
    padding: 5,
    borderRadius: 3,
  },
  offDeal: {
    color: "white",
    fontSize: 12,
  },
  deal: {
    color: "#be0201",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountPrice: {
    color: "black",
    fontSize: 16,
    marginVertical: 5,
  },
  mrp: {
    fontSize: 10,
    marginHorizontal: 5,
  },
  actualPrice: {
    fontSize: 10,
    textDecorationLine: "line-through",
  },
  productName: {
    color: "black",
    fontSize: 14,
  },
  allDeals: {
    color: "#017185",
    fontSize: 14,
    marginVertical: 10,
  },
});

export default Deals;
