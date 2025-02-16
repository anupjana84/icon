// import { ActivityIndicator, Linking, StyleSheet, Text,
//   Dimensions, View, TouchableOpacity, Alert,  } from 'react-native';
// import React, { useContext, useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Icon from "react-native-vector-icons/dist/AntDesign";
// import Icon2 from "react-native-vector-icons/dist/MaterialCommunityIcons";
// import Icon3 from "react-native-vector-icons/dist/FontAwesome5";
// import ProductDetailsScreen from "./screen/ProductDetailsScreen";
// import CartScreen from "./screen/CartScreen";
// import ReorderScreen from "./screen/ReorderScreen";
// import AccountScreen from "./screen/AccountScreen";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { CartContext, CartProvider } from "./context/CartContext";



// import Scanner from "./components/Scanner";
// import { Provider, useSelector } from "react-redux";

// import SearchScreen from "./screen/SearchScreen";
// import ProductForm from "./components/ProductForm";
// import Drawer from "./components/Drawer";
// import ForgotPasswordScreen from "./screen/ForgotPasswordScreen";
// import ProductList from "./screen/ProductList";
// import ProductQRDetail from "./screen/ProductQRDetail";
// import SplashScreen from "./components/SplashScreen";
// import OrderForm from "./components/OrderForm";
// import OrderPlacedScreen from "./components/OrderPlacedScreen";
// import ProfileScreen from "./screen/ProfileScreen";
// import OrderHistoryScreen from "./screen/OrderHistoryScreen";
// import EditProfileForm from "./components/EditProfileForm";
// import PaymentHistoryScreen from "./screen/PaymentHistoryScreen";
// import ChangePasswordForm from "./components/ChangePasswordForm";
// import AddCustomer from "./components/AddCustomer";
// import PointHistoryScreen from "./screen/PointHistoryScreen";
// import AllCustomer from "./screen/AllCustomer";
// import ManagerPaymentHistory from "./screen/ManagerPaymentHistory";
// import FullScreen from "./components/FullScreen";
// import ProductDetail from "./screen/ProductDetail";
// import HomeScreen from "./screen/HomeScreen";
// import { LandingPage } from "./screen/LandingPage";
// import LoginScreen from "./screen/LoginScreen";
// import ProductScreen from "./screen/ProductScreen";
// import store from "../Store";
// import Scan from "./screen/Scan";
// import AddRecordForm from "./screen/AddRecordForm";
//  //import BarcodeScanner from "./src/components/BarcodeScanner";
//  import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const MyHomeStack = () => {
//   const { login } = useSelector((state) => state.home);
//   //  console.log("login", login);
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="Landing" component={LandingPage} />
//       <Stack.Screen name="addRecordForm" component={AddRecordForm} />
     
//       <Stack.Screen name="Product" component={ProductScreen} />
//       <Stack.Screen name="Cart" component={CartScreen} />
//       <Stack.Screen name="Search" component={SearchScreen} />
//       <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetail} />
//       <Stack.Screen name="PRODUCT_QR__DETAILS" component={ProductQRDetail} />
//       <Stack.Screen name="FullScreen" component={FullScreen} />
//       {/* <Stack.Screen name="BarcodeScanner" component={Scanner} /> */}
//       <Stack.Screen name="BarcodeScanner" component={Scan} />
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
//       <Stack.Screen name="PointHistory" component={PointHistoryScreen} />
//       <Stack.Screen name="AllCustomer" component={AllCustomer} />
//       <Stack.Screen name="customer" component={AddCustomer} />
//       <Stack.Screen
//         name="PaymentHistory"
//         component={
//           login?.result?.role === "salesman"
//             ? PaymentHistoryScreen
//             : ManagerPaymentHistory
//         }
//       />
//       <Stack.Screen name="changepassword" component={ChangePasswordForm} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//     </Stack.Navigator>
//   );
// };
// const MyHomeStack2 = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="HOME" component={HomeScreen} />
//       <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetail} />
//     </Stack.Navigator>
//   );
// };
// const MyHomeStack3 = () => {
//   const { login } = useSelector((state) => state.home);
//   //  console.log("login", login);
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen
//         name="Login"
//         component={
//           login?.result?.role === "salesman"
//             ? ProfileScreen
//             : login?.result?.role === "manager"
//             ? ProfileScreen
//             : LoginScreen
//         }
//       />
//       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//       <Stack.Screen name="Productlist" component={ProductList} />
//       <Stack.Screen name="EditProduct" component={ProductForm} />
//       <Stack.Screen name="Profile2" component={ProfileScreen} />
//       <Stack.Screen name="edit" component={EditProfileForm} />
//     </Stack.Navigator>
//   );
// };
// const MyHomeStackCart = () => {
//   const { login } = useSelector((state) => state.home);
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen
//         name="Cart"
//         component={login?.result?.role === "manager" ? ProductList : CartScreen}
//       />
//       <Stack.Screen name="Order" component={OrderForm} />
//       <Stack.Screen name="confirm" component={OrderPlacedScreen} />
//       <Stack.Screen name="EditProduct" component={ProductForm} />
//       <Stack.Screen name="Home" component={LandingPage} />
//       <Stack.Screen name="Productlist" component={ProductList} />
//     </Stack.Navigator>
//   );
// };
// const App = () => {
//     const { hasPermission: cameraHasPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 5000); // Delay for 3 seconds
//     return () => clearTimeout(timer);
//   }, []);
//   const handleCameraPermission = async () => {
//     const granted = await requestCameraPermission();
//     if (!granted) {
//       Alert.lert('Camera permission is required to use the camera. Please grant permission in your device settings.');
//       Linking.openSettings();
//     }
//   };

//   useEffect(() => {
//     if (!cameraHasPermission) {
//       handleCameraPermission();
//     }
//   }, [cameraHasPermission]);

//   if (isLoading) {
//     return <SplashScreen />;
//   }

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <CartProvider>
//           <Tab.Navigator
//             screenOptions={{
//               headerShown: false,
//               tabBarShowLabel: false,
//             }}
//           >
//             <Tab.Screen
//               name="HOME_STACK"
//               component={MyHomeStack}
//               options={{
//                 tabBarIcon: ({ focused, size }) => {
//                   if (focused) {
//                     return <Icon name="home" size={32} color="#88dae0" />;
//                   } else {
//                     return <Icon name="home" size={32} color="black" />;
//                   }
//                 },
//               }}
//             />
//             <Tab.Screen
//               name="REORDER"
//               component={MyHomeStack2}
//               options={{
//                 tabBarIcon: ({ focused, size }) => {
//                   if (focused) {
//                     return <Icon2 name="dots-grid" size={32} color="#88dae0" />;
//                   } else {
//                     return <Icon2 name="dots-grid" size={32} color="black" />;
//                   }
//                 },
//               }}
//             />
//             <Tab.Screen
//               name="CART"
//               component={MyHomeStackCart}
//               options={{
//                 tabBarIcon: ({ focused, size }) => {
//                   const { cart } = useSelector((state) => state.ui);
//                   const { login } = useSelector((state) => state.home);
//                   if (login?.result?.role === "manager") {
//                     if (focused) {
//                       return <Icon3 name="edit" size={26} color="#88dae0" />;
//                     } else {
//                       return <Icon3 name="edit" size={26} color="black" />;
//                     }
//                   } else {
//                     if (focused) {
//                       return (
//                         <View style={{ position: "relative" }}>
//                           <Icon name="shoppingcart" size={32} color="#88dae0" />
//                           <View
//                             style={{
//                               position: "absolute",
//                               right: -3,
//                               bottom: 22,
//                               height: 14,
//                               width: 14,
//                               backgroundColor: "#E96E6E",
//                               borderRadius: 7,
//                               alignItems: "center",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <Text style={{ color: "white", fontSize: 10 }}>
//                               {cart.length}
//                             </Text>
//                           </View>
//                         </View>
//                       );
//                     } else {
//                       return (
//                         <View style={{ position: "relative" }}>
//                           <Icon name="shoppingcart" size={32} color="black" />
//                           <View
//                             style={{
//                               position: "absolute",
//                               right: -3,
//                               bottom: 22,
//                               height: 14,
//                               width: 14,
//                               backgroundColor: "black",
//                               borderRadius: 7,
//                               alignItems: "center",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <Text style={{ color: "white", fontSize: 10 }}>
//                               {cart.length}
//                             </Text>
//                           </View>
//                         </View>
//                       );
//                     }
//                   }
//                 },
//               }}
//             />
//             {/* <Tab.Screen
//               name="PROFILE"
//               component={MyHomeStack3}
//               options={{
//                 tabBarIcon: ({ focused, size }) => {
//                   if (focused) {
//                     return <Icon3 name="edit" size={26} color="#88dae0" />;
//                   } else {
//                     return <Icon3 name="edit" size={26} color="black" />;
//                   }
//                 },
//               }}
//             /> */}
//             <Tab.Screen
//               name="ACCOUNT"
//               component={MyHomeStack3}
//               options={{
//                 tabBarIcon: ({ focused, size }) => {
//                   if (focused) {
//                     return <Icon2 name="account" size={32} color="#88dae0" />;
//                   } else {
//                     return <Icon2 name="account" size={32} color="black" />;
//                   }
//                 },
//               }}
//             />
//           </Tab.Navigator>
//         </CartProvider>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;
