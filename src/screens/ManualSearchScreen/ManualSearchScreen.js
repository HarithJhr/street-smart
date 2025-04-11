import React, { useState, useEffect } from "react";
import { Text, View, TextInput, FlatList, TouchableOpacity, StatusBar, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from '../../helpers/api.js';  // Adjust the path if necessary
import styles from './ManualSearchStyles';
import SwitchSelector from "react-native-switch-selector";

export default function ManualSearch({ navigation }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [lotType, setLotType] = useState("C");
    const [carParks, setCarParks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);

    // Initialise favourites
    useEffect(() => {
        loadFavorites();

        fetch()

        if (lotType) {
            // fetch car parks every time the lot type changes
            fetch(); 
          }
    }, [lotType]);

    // Load favorites from AsyncStorage
    const loadFavorites = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem("favorites");
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error("Failed to load favorites", error);
        }
    };

    // Save car park to favorites
    // This function is responsible for saving or removing a car park from the favorites list.
    const saveToFavorites = async (carPark) => {
        try {
            // Retrieve the current favorites from AsyncStorage
            const savedFavorites = await AsyncStorage.getItem("favorites");
            const favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];

            // Create a new entry for the car park
            const favoriteEntry = {
                carparkNo: carPark.carparkNo,
                lotType: carPark.lotType,
            };

            // Check if the car park is already a favorite
            const isFavorite = favoritesArray.some(
                (fav) => fav.carparkNo === favoriteEntry.carparkNo
            );

            // If the car park is not a favorite, add it to the favorites list
            if (!isFavorite) {
                const updatedFavorites = [...favoritesArray, favoriteEntry];
                await AsyncStorage.setItem(
                    "favorites",
                    JSON.stringify(updatedFavorites)
                );
                setFavorites(updatedFavorites);  // Update local state
            } 
            
            // If the car park is already a favorite, remove it from the favorites list
            else {
                const updatedFavorites = favoritesArray.filter(
                    (fav) => fav.carparkNo !== favoriteEntry.carparkNo
                );
                await AsyncStorage.setItem(
                    "favorites",
                    JSON.stringify(updatedFavorites)
                );
                setFavorites(updatedFavorites);  // Update local state
            }
        } catch (error) {
            console.error("Failed to save favorite", error);
        }
    };

    // Fetch car parks based on search query and lot type
    const fetch = async () => {
        setLoading(true);  // Set loading state to true
        const response = await api.fetchCarParks(searchQuery, lotType);  // Call the API to fetch car parks
        setCarParks(response);  // Update the car parks state with the fetched data
        setLoading(false);  // Set loading state to false
    };

    // Render each car park item
    const renderCarPark = ({ item }) => {
        // Check if the car park is already a favorite
        const isFavorite = favorites.some((fav) => fav.carparkNo === item.carparkNo);

        return (
            <View style={styles.card}>
                <View>
                    <Text style={[styles.carparkNumber, styles.textWhite]}>
                        Carpark Number: {item.carparkNo}
                    </Text>
                    <Text style={styles.textWhite}>Lot Type: {item.lotType}</Text>
                    <Text style={styles.textWhite}>Available Lots: {item.lotsAvailable}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => saveToFavorites(item)}
                >
                    <Image source={isFavorite ? require('../../../assets/heart_filled.png') 
                    : require('../../../assets/heart_line.png')
                    } 
                    style={styles.heart} />

                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
                
            <View style={styles.topBanner}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}> ← </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search  for a carpark by code..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                    onSubmitEditing={fetch}
                />
                <SwitchSelector
                    options={[
                        { label: "Car", value: "C" },
                        { label: "Motorcycle", value: "M" },
                        { label: "Heavy", value: "H" }
                    ]}
                    initial={0}
                    onPress={(value) => setLotType(value)}
                    style={styles.switchSelector}
                    buttonColor="#5f2da2"
                    borderColor="#fff"
                    hasPadding={true}
                    valuePadding={4}
                    borderWidth={0}
                />
            
                {loading ? <Text>Loading...</Text> : null}
                <FlatList
                    data={carParks}
                    keyExtractor={(item) => item.carparkNo}
                    renderItem={renderCarPark}
                />
            </View>
        </>
    );
}