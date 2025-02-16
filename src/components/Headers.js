import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Feather from "react-native-vector-icons/dist/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Headers = ({ toggleDrawer }) => {
  const navigation = useNavigation();
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#88dae0", "#98e1d6", "#9ee4d4"]}
        style={styles.container}
      >
        <Icon2 name="sort" size={32} color="black" onPress={toggleDrawer} />
        <View style={styles.inputBox}>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="search" size={22} color="#1f1f1f" />
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <View style={styles.textInput}></View>
            </TouchableOpacity>
          </TouchableOpacity>
         <TouchableOpacity
         style={{width:"10%"}}
            onPress={() => navigation.navigate("BarcodeScanner")}
          >
            <AntDesign name="scan1" size={22} color="#909594" />
          </TouchableOpacity> 
        </View>
        {/* <Feather name="mic" size={20} color="#000000" /> */}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a1bcc0",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    width: "90%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  textInput: {
    padding: 24,
  },
});

export default Headers;
