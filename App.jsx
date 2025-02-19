import { Linking, Text,
   View,  Alert,  } from 'react-native';
import React, {  useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screen/HomeScreen";
import Icon from "react-native-vector-icons/dist/AntDesign";
import Icon2 from "react-native-vector-icons/dist/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/dist/FontAwesome5";
import Icon4 from "react-native-vector-icons/dist/FontAwesome5";

import CartScreen from "./src/screen/CartScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartContext, CartProvider } from "./src/context/CartContext";
import LoginScreen from "./src/screen/LoginScreen";
import { LandingPage } from "./src/screen/LandingPage";
import ProductScreen from "./src/screen/ProductScreen";

import { Provider, useSelector } from "react-redux";
import store from "./Store";
import SearchScreen from "./src/screen/SearchScreen";
import ProductForm from "./src/components/ProductForm";

import ForgotPasswordScreen from "./src/screen/ForgotPasswordScreen";
import ProductList from "./src/screen/ProductList";
import ProductQRDetail from "./src/screen/ProductQRDetail";
import SplashScreen from "./src/components/SplashScreen";
import OrderForm from "./src/components/OrderForm";
import OrderPlacedScreen from "./src/components/OrderPlacedScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import OrderHistoryScreen from "./src/screen/OrderHistoryScreen";
import EditProfileForm from "./src/components/EditProfileForm";
import PaymentHistoryScreen from "./src/screen/PaymentHistoryScreen";
import ChangePasswordForm from "./src/components/ChangePasswordForm";
import AddCustomer from "./src/components/AddCustomer";
import PointHistoryScreen from "./src/screen/PointHistoryScreen";
import AllCustomer from "./src/screen/AllCustomer";
import ManagerPaymentHistory from "./src/screen/ManagerPaymentHistory";
import FullScreen from "./src/components/FullScreen";
import ProductDetail from "./src/screen/ProductDetail";
import Scan from "./src/screen/Scan";
import AddRecordForm from "./src/screen/AddRecordForm";
import ProductQRDetailError from "./src/screen/ProductQRDetailError";

// import BarcodeScanner from "./src/components/BarcodeScanner";
import {  useCameraPermission } from 'react-native-vision-camera';
import HelpScreen from './src/components/Help';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyHomeStack = () => {
  const { login } = useSelector((state) => state.home);
  //console.log("login", login);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetail} />
      <Stack.Screen name="PRODUCT_QR__DETAILS" component={ProductQRDetail} />
      <Stack.Screen name="FullScreen" component={FullScreen} />
      {/* <Stack.Screen name="BarcodeScanner" component={Scanner} /> */}
      <Stack.Screen name="ProductQRDetailError" component={ProductQRDetailError} />
      <Stack.Screen name="BarcodeScanner" component={Scan} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="PointHistory" component={PointHistoryScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="AllCustomer" component={AllCustomer} />
      <Stack.Screen name="customer" component={AddCustomer} />
      {/* <Stack.Screen name="AddRecordForm" component={AddRecordForm} /> */}
      <Stack.Screen
        name="PaymentHistory"
        component={
          login?.result?.role === "salesman"
            ? PaymentHistoryScreen
            : ManagerPaymentHistory
        }
      />
      <Stack.Screen name="changepassword" component={ChangePasswordForm} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
const MyHomeStack2 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetail} />
    </Stack.Navigator>
  );
};
const MyHomeStack3 = () => {
  const { login } = useSelector((state) => state.home);
  //console.log("login", login);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={
          login?.result?.role === "salesman"
            ? ProfileScreen
            : login?.result?.role === "manager"
            ? ProfileScreen
            : LoginScreen
        }
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Productlist" component={ProductList} />
      <Stack.Screen name="EditProduct" component={ProductForm} />
      <Stack.Screen name="Profile2" component={ProfileScreen} />
      <Stack.Screen name="edit" component={EditProfileForm} />
    </Stack.Navigator>
  );
};
const MyHomeStackCart = () => {
  const { login } = useSelector((state) => state.home);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Cart"
        component={login?.result?.role === "manager" ? ProductList : CartScreen}
      />
      <Stack.Screen name="Order" component={OrderForm} />
      <Stack.Screen name="confirm" component={OrderPlacedScreen} />
      <Stack.Screen name="EditProduct" component={ProductForm} />
      <Stack.Screen name="Home" component={LandingPage} />
      <Stack.Screen name="Productlist" component={ProductList} />
    </Stack.Navigator>
  );
};
const App = () => {
  const { hasPermission: cameraHasPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Delay for 3 seconds
    return () => clearTimeout(timer);
  }, []);
    const handleCameraPermission = async () => {
      const granted = await requestCameraPermission();
      if (!granted) {
        Alert.lert('Camera permission is required to use the camera. Please grant permission in your device settings.');
        Linking.openSettings();
      }
    };
  
    useEffect(() => {
      if (!cameraHasPermission) {
        handleCameraPermission();
      }
    }, [cameraHasPermission]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <CartProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              name="HOME_STACK"
              component={MyHomeStack}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  if (focused) {
                    return <Icon name="home" size={32} color="#88dae0" />;
                  } else {
                    return <Icon name="home" size={32} color="black" />;
                  }
                },
              }}
            />
            <Tab.Screen
              name="REORDER"
              component={MyHomeStack2}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  if (focused) {
                    return <Icon2 name="dots-grid" size={32} color="#88dae0" />;
                  } else {
                    return <Icon2 name="dots-grid" size={32} color="black" />;
                  }
                },
              }}
            />
            <Tab.Screen
              name="CART"
              component={MyHomeStackCart}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  const { cart } = useSelector((state) => state.ui);
                  const { login } = useSelector((state) => state.home);
                  if (login?.result?.role === "manager") {
                    if (focused) {
                      return <Icon3 name="edit" size={26} color="#88dae0" />;
                    } else {
                      return <Icon3 name="edit" size={26} color="black" />;
                    }
                  } else {
                    if (focused) {
                      return (
                        <View style={{ position: "relative" }}>
                          <Icon name="shoppingcart" size={32} color="#88dae0" />
                          <View
                            style={{
                              position: "absolute",
                              right: -3,
                              bottom: 22,
                              height: 14,
                              width: 14,
                              backgroundColor: "#E96E6E",
                              borderRadius: 7,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ color: "white", fontSize: 10 }}>
                              {cart.length}
                            </Text>
                          </View>
                        </View>
                      );
                    } else {
                      return (
                        <View style={{ position: "relative" }}>
                          <Icon name="shoppingcart" size={32} color="black" />
                          <View
                            style={{
                              position: "absolute",
                              right: -3,
                              bottom: 22,
                              height: 14,
                              width: 14,
                              backgroundColor: "black",
                              borderRadius: 7,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ color: "white", fontSize: 10 }}>
                              {cart.length}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  }
                },
              }}
            />
            {/* <Tab.Screen
              name="PROFILE"
              component={MyHomeStack3}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  if (focused) {
                    return <Icon3 name="edit" size={26} color="#88dae0" />;
                  } else {
                    return <Icon3 name="edit" size={26} color="black" />;
                  }
                },
              }}
            /> */}
            <Tab.Screen
              name="ACCOUNT"
              component={MyHomeStack3}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  if (focused) {
                    return <Icon2 name="account" size={32} color="#88dae0" />;
                  } else {
                    return <Icon2 name="account" size={32} color="black" />;
                  }
                },
              }}
            />
            {/* <Stack.Screen name="AddRecordForm" component={AddRecordForm} /> */}
            <Tab.Screen
              name="AddRecordForm"
              component={AddRecordForm}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  if (focused) {
                    return <Icon4 name="handshake" size={28} color="#88dae0" />;
                  } else {
                    return <Icon4 name="handshake" size={28} color="black" />;
                  }
                },
              }}
            />
          </Tab.Navigator>
        </CartProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;


