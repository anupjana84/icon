import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../reducers/HomeReducer";
import { useNavigation } from "@react-navigation/native";

const Drawer = ({
  drawerAnimation,
  toggleDrawer,
  isDrawerOpen,
  closeDrawer,
  userInfo,
  onLogin,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const { login } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // This function handles closing the drawer only if the click is outside the drawer content
  const handleOverlayPress = () => {
    closeDrawer();
  };

  return (
    <>
            

      {/* Overlay */}
      {isDrawerOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={handleOverlayPress}
          activeOpacity={1}
        />
      )}

      {/* Side Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerAnimation }],
            width: screenWidth * 0.72,
            zIndex: 2, // Ensure the drawer content is above the overlay
          },
        ]}
      >
        {login?.status === "success" ? (
          <>
          
            {/* User Info Section */}
            <View style={styles.userInfoContainer}>
              <Image
                source={{ uri: userInfo.profilePicture }}
                style={styles.profileImage}
              />
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userEmail}>{userInfo.email}</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
              {/* <TouchableOpacity
                style={styles.menuItem}
                onPress={() => //  console.log("Home pressed")}
              >
                <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("changepassword")}
              >
                <Text style={styles.menuText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.menuText}>Product</Text>
              </TouchableOpacity>
              {login?.result?.role === "salesman" && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("OrderHistory")}
                >
                  <Text style={styles.menuText}>Order History</Text>
                </TouchableOpacity>
              )}
              {login?.result?.role === "salesman" && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("PointHistory")}
                >
                  <Text style={styles.menuText}>Point History</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("PaymentHistory")}
              >
                <Text style={styles.menuText}>Payment History</Text>
              </TouchableOpacity>
              {login?.result?.role === "salesman" && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("customer")}
                >
                  <Text style={styles.menuText}>Add Customer</Text>
                </TouchableOpacity>
              )}
              {login?.result?.role === "salesman" && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("AllCustomer")}
                >
                  <Text style={styles.menuText}>All Customer</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Cart")}
              >
                <Text style={styles.menuText}>Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("HelpScreen")}
              >
                <Text style={styles.menuText}>Help</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("AddRecordForm")}
              >
                <Text style={styles.menuText}>Add Support</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  dispatch(loginSuccess(null));
                  closeDrawer();
                }}
              >
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
            
          </>
        ) : (
          /* Login Section */
          <View style={styles.loginContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5234/5234205.png",
              }} // Replace with your logo URL
              style={styles.logo}
            />
            <Text style={styles.loginPrompt}>You are not logged in.</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                navigation.navigate("Login");
                closeDrawer();
              }}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Close Button */}
        <TouchableOpacity
          onPress={toggleDrawer}
          style={styles.closeButtonContainer}
        >
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
      
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(0,0,0,0.5)", // Overlay background with opacity
    zIndex: 1, // Ensure overlay is beneath drawer
  },
  drawer: {
    position: "absolute",
    left: -35,
    top: 0,
    bottom: 0,
    backgroundColor: "#f4f4f4",
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfoContainer: {
    alignItems: "center",
    // marginBottom: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  menuContainer: {
    // marginTop: 5,
    marginLeft:10
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginPrompt: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButtonContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
  closeButton: {
    color: "#6200ee",
    fontSize: 16,
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginBottom: 20, // Space between the logo and the login prompt
  },
});

export default Drawer;
