import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    StatusBar,
    BackHandler,
  } from "react-native";
  import React, { useContext, useEffect } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { CartContext } from "../context/CartContext";
  import CarouselProduct from "../components/CarouselProduct";
  import ProductDetails_1 from "../components/ProductDetails_1";
  import ProductDetailsPrice from "../components/ProductDetailsPrice";
  import { useDispatch, useSelector } from "react-redux";
  import { addCartRow } from "../../reducers/UiReducer";
  import HeaderQr from "../components/HearderQr";

const ProductQRDetailError = () => {
 
    return (
        <>
          <View style={styles.container}>

            <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
           <View style={styles.header}>
           <HeaderQr
              isCart={true}
              name={`Back`}
            />
            </View>
            <View style={{flex:1, justifyContent:"center",alignItems:"center" }}>
              <Text>Product Not Found</Text>
            </View>
          </View>
        </>
      );
    };
    
    export default ProductQRDetailError;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      header: {
        padding: 15,
      },
      imageContainer: {
        height: 420,
        width: "100%",
      },
    });