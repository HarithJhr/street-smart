import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, StatusBar, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from '../../helpers/api.js';  // Adjust the path if necessary
import styles from './FavouritesStyles';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook


export default function FavouritesScreen() {
    const [favorites, setFavorites] = useState([]);
    const navigation = useNavigation(); // Initialize the useNavigation hook

    // Load favorites from AsyncStorage on component mount
    useEffect(() => {
        loadFavorites();
    }, []);

    // Function to load favorites from AsyncStorage
    const loadFavorites = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem("favorites");
            if (savedFavorites) {
                const favoritesArray = JSON.parse(savedFavorites);
                if (favoritesArray.length === 0) { return }
                
                // Fetch car park data from API
                const response = await api.fetchCarParks("", "C");

                // Update lotsAvailable for each favorite car park
                const updatedFavorites = await Promise.all(favoritesArray.map(async (fav) => {
                    const filtered = response.filter((cp) => 
                        cp.carparkNo === fav.carparkNo &&
                        cp.lotType === fav.lotType
                    );
                    return {
                        ...fav,
                        lotsAvailable: filtered.length ? filtered[0].lotsAvailable : 'N/A', // Update lotsAvailable
                    };
                }));
                setFavorites(updatedFavorites);
            }
        } catch (error) {
            console.error("Failed to load favorites", error);
        }
    };

    // Function to remove a car park from favorites
    const removeFromFavorites = async (carparkNo) => {
        const updatedFavorites = favorites.filter(
            (cp) => cp.carparkNo !== carparkNo
        );

        setFavorites(updatedFavorites);

        try {
            await AsyncStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );
        } catch (error) {
            console.error("Failed to remove favorite", error);
        }
    };

    // Render each favorite car park as a card
    const renderFavoriteCarPark = ({ item }) => (
        <View style={styles.card}>
            <View>
                <Text style={styles.carparkNumber}>
                    Carpark Number: {item.carparkNo}
                </Text>
                <Text style={styles.textWhite}>Lot Type: {item.lotType}</Text>
                <Text style={styles.textWhite}>Available Lots: {item.lotsAvailable}</Text>
            </View>
            <TouchableOpacity
                onPress={() => removeFromFavorites(item.carparkNo)}
            >
                <Image source={require('../../../assets/heart_filled.png')} 
                    style={styles.heart} />
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <View style={styles.topBanner}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}> ← </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
            <Text style={styles.title}>Favourites</Text>
                <View style={styles.container}>

                    {/* If no favourites, this component will show */}
                    {favorites.length === 0 ? <Text style={styles.noFavorites}>
                        Hmm... You don't have any favorites yet!
                        </Text> : null}
                        
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.carparkNo}
                        renderItem={renderFavoriteCarPark}
                    />
                </View>
            </View>
        </>
    );
}
