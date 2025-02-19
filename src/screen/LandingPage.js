import React, { useEffect, useState, useRef } from "react";
import Carousel from "../components/Carousel";
import SubHeader from "../components/SubHeader";
import Category from "../components/Category";
import Deals from "../components/Deals";
import {
  ScrollView,
  View,
  StatusBar,
  Animated,
  TouchableOpacity,
  RefreshControl,
  Text,
} from "react-native";
import Headers from "../components/Headers";
import { useDispatch, useSelector } from "react-redux";
import {
  bannerDispatch,
  categoryDispatch,
  loginSuccess,
  productBottomDispatch,
  productHotDispatch,
  productTopDispatch,
  salesSuccess
} from "../../reducers/HomeReducer";
import Drawer from "../components/Drawer";
import CarouselBottom from "../components/CarouselBottom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LandingPage = () => {
  const dispatch = useDispatch();
  const { banner, category, login, productHot, } = useSelector(
    (state) => state.home
  );
 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Refreshing state to control loading indicator
  const drawerAnimation = useRef(new Animated.Value(-300)).current; // Drawer starts off-screen
    // console.log("productHot[0]", productHot);
  const toggleDrawer = () => {
    if (isDrawerOpen) {
      // Close drawer
      Animated.timing(drawerAnimation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    } else {
      // Open drawer
      setIsDrawerOpen(true);
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  useEffect(() => {
    // Function to load cart from AsyncStorage
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem("login");
        const salaseData = await AsyncStorage.getItem("sales");
        if (salaseData) {
            dispatch(salesSuccess(JSON.parse(salaseData)));
        }
        // console.log(salaseData,'salaseData')
        if (cartData) {
          // If cart data exists, parse it and dispatch the setCart action
          const parsedCart = JSON.parse(cartData);
          dispatch(loginSuccess(parsedCart));
        }
      } catch (error) {
        console.error("Failed to load cart from AsyncStorage", error);
      }
    };

    loadCart(); // Load the cart data when the app starts
  }, [dispatch]);
  const closeDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(drawerAnimation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    }
  };

  // Function to handle the refresh action
  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    await dispatch(bannerDispatch()); // Dispatch actions to fetch fresh data
    await dispatch(categoryDispatch());
    await dispatch(productTopDispatch());
    await dispatch(productBottomDispatch());
    await dispatch(productHotDispatch());
    setRefreshing(false); // Set refreshing state to false once data is fetched
  };

  useEffect(() => {
    // console.log("first")
    dispatch(bannerDispatch());
    dispatch(categoryDispatch());
    dispatch(productTopDispatch());
    dispatch(productBottomDispatch());
    dispatch(productHotDispatch());
  }, []);

  // //  console.log("category", category);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Control the refresh indicator
            onRefresh={onRefresh} // Call the refresh handler on pull-to-refresh
            tintColor="#9ee4d4" // Color of the spinner
            title="Refreshing..." // Text to show while refreshing
            titleColor="#9ee4d4" // Color of the title
          />
        }
      >
        <StatusBar backgroundColor="#9ee4d4" barStyle="light-content" />
        <Headers toggleDrawer={toggleDrawer} />
        {/* <SubHeader closeDrawer={closeDrawer} /> */}
        <Category closeDrawer={closeDrawer} />
        <Carousel />
        <View style={{ backgroundColor: "white", paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "black",
              paddingHorizontal: 10,
            }}
          >
            Recommended deal for you
          </Text>
        </View>
        {productHot?.data?.map((i) => {
          return <Deals item={i} key={i.id} />;
        })}
        <View>
          <CarouselBottom />
        </View>
        <Drawer
          drawerAnimation={drawerAnimation}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
          userInfo={
            true
              ? {
                  profilePicture:
                    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
                  name: login?.result?.name,
                  email: login?.result?.phone,
                }
              : null
          }
          onLogin={() => console.log("Login pressed")}
        /> 
      </ScrollView>
    </>
  );
};
