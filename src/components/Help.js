import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import { baseUrl } from "../utils/apiList";
import axios from "axios";

const HelpScreen = () => {
    const [searchText, setSearchText] = useState("");
    const [helpDetails, setHelpDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch help details from the API
    const getHelpDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/help`);
            setHelpDetails(response.data.helplines);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getHelpDetails();
    }, []);

    // Filter helpDetails based on searchText
    const filteredHelpDetails = helpDetails.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Render each help item
    const renderOrderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={{ fontSize: 20, color: "black" }}>{item.name}</Text>
                {item.phones.map((phone) => (
                    <Text key={phone}>Phone: {phone}</Text>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header isCart={true} name={"Help"} />

            {/* Search Input */}
            <TextInput
                placeholder="Search"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                style={styles.textInput}
            />

            {/* Loading Indicator */}
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                </View>
            ) : (
                // FlatList for displaying filtered help details
                <FlatList
                    data={filteredHelpDetails}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderOrderItem}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No results found</Text>
                    }
                />
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f8f9fa",
    },
    textInput: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: "black",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
       
        marginHorizontal:20,
        marginVertical:15
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
        marginTop: 20,
    },
});

export default HelpScreen;