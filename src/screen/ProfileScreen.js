import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../reducers/HomeReducer";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { login, sales, salespoint } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //  console.log("salespoint", salespoint);
  //  console.log("login", login);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <Header isCart={true} name={"Profile"} />
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{login?.result?.name}</Text>
        <Text style={styles.userBio}>{login?.result?.role}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("edit")}
        >
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            dispatch(loginSuccess(null));
            navigation.navigate("Landing");
          }}
        >
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        {/* <Text style={styles.infoText}>Email: {login?.result?.email}</Text> */}
        <Text style={styles.infoText}>Phone: {login?.result?.phone}</Text>
        <Text style={styles.infoText}>Whatapp: {login?.result?.wpnumber}</Text>
        {login?.result?.role==="salesman" && (
          <Text style={styles.infoText}>
          Points: { parseInt(login?.salesman?.point)?parseInt(login?.salesman?.point):0 
          + parseInt(login?.salesman?.other_point )?parseInt(login?.salesman?.other_point ):0}
        </Text>
          
        )}
         <Text style={styles.infoText}>
          Joined Date: {login?.result?.created_at.split("T")[0]}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        {/* <Text style={styles.sectionTitle}>Social Media</Text> */}
       
        {/* <Text style={styles.infoText}>Instagram: @john_doe</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  userBio: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
  },
  infoContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default ProfileScreen;
