import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StatusBar, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as api from '../../helpers/api.js';  // Adjust the path if necessary
import styles from './MapStyles';
import proj4 from 'proj4';
import SwitchSelector from "react-native-switch-selector";
import * as Location from 'expo-location';  // Import expo-location




const MapScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [carParks, setCarParks] = useState([]);
    const [lotType, setLotType] = useState("C");
    const [mapRegion, setMapRegion] = useState({
        latitude: 1.3521, // Default latitude (Singapore)
        longitude: 103.8198, // Default longitude (Singapore)
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    });
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(false);


    // Define EPSG:3414 (SVY21) projection manually
    proj4.defs("EPSG:3414", "+proj=tmerc +lat_0=1.366666 +lon_0=103.833333 +k=1.0 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs");


    useEffect(() => {
        // Request location permissions
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            // Get user's current location
            setLoading(true);
            let location = await Location.getCurrentPositionAsync({});
            setLoading(false);
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();

        fetchCarParksGeolocation(); // Fetch initial car parks data
        if (lotType) {
            // Fetch car parks every time the lot type changes
            fetchCarParksGeolocation();
          }
    }, [lotType]);

    const fetchCarParksGeolocation = async () => {
        try {
            // Fetch car parks data from API
            const response = await api.fetchCarParks(searchQuery, lotType);
            
            // Convert SVY21 coordinates to WGS84
            const convertedResults = response.map(cp => {
                const lat = parseFloat(cp.geometries[0]?.coordinates.split(/\s*,\s*/)[0]);
                const long = parseFloat(cp.geometries[0]?.coordinates.split(/\s*,\s*/)[1]);

                if (isNaN(lat) || isNaN(long)) {
                    console.error(`Invalid coordinates for car park ${cp.carparkNo} ${cp.lotType}: lat=${lat}, long=${long}`);
                    return null; // Skip this entry if coordinates are invalid
                }
                // Use proj4 to convert SVY21 to WGS84
                const [LONGITUDE, LATITUDE] = proj4('EPSG:3414', 'EPSG:4326', [lat, long]);

                return { ...cp, LATITUDE, LONGITUDE };
            }).filter(Boolean); // Filter out any null results due to invalid coordinates

            setCarParks(convertedResults);
        } catch (error) {
            console.error("Failed to fetch car parks", error);
        }
    };

    // Function to zoom into the selected car park on the map
    const handleListItemPress = (latitude, longitude) => {
        setMapRegion({
            ...mapRegion,
            latitude,
            longitude,
            latitudeDelta: 0.005, // Zoom in closer
            longitudeDelta: 0.005,
        });
    };

    // Function to center the map on the user's current location
    const handleCurrentLocationPress = async () => {
        if (loading) { return; } // Prevent multiple clicks while loading

        // Get user's current location
        setLoading(true);
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        // Center the map on the user's location
        if (userLocation) {
            setMapRegion({
                ...mapRegion,
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
        setLoading(false);
    }; 

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Show loading icon when fetching user's location */}
            {loading && <ActivityIndicator style={styles.loadingText} size="large" color="#5f2da2" />}

            <View style={styles.topBanner}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}> ← </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCurrentLocationPress()}>
                    <Image source={require('../../../assets/location.png')} style={styles.locationButton} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {/* Search feature */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBox}
                        placeholder="Search  for a carpark by code..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType="search"
                        onSubmitEditing={fetchCarParksGeolocation}
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
                </View>

                {/* Map View */}
                <MapView
                    style={styles.map}
                    region={mapRegion}
                    onRegionChangeComplete={region => setMapRegion(region)}
                >
                    {/* Set markers on carpark locations */}
                    {carParks.map(cp => (
                        <Marker
                            key={cp.carparkNo}
                            coordinate={{
                                latitude: cp.LATITUDE,
                                longitude: cp.LONGITUDE,
                            }}
                            title={cp.carparkNo}
                            description={`Available Lots: ${cp.lotsAvailable}`}
                        />
                    ))}

                    {/* Show user's location on the map */}
                    {userLocation && (
                            <Marker
                                coordinate={{
                                    latitude: userLocation.latitude,
                                    longitude: userLocation.longitude,
                                }}
                                title="Your Location"
                                pinColor="blue"  // Different color to distinguish user's location
                            />
                        )}
                </MapView>

                {/* List of car parks */}
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={carParks}
                        keyExtractor={(item) => item.carparkNo}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.card}
                                onPress={() => handleListItemPress(item.LATITUDE, item.LONGITUDE)} // Zoom into the location on press
                            >
                                <Text style={[styles.carparkNumber, styles.textWhite]}>Carpark Number: {item.carparkNo}</Text>
                                <Text style={styles.textWhite}>Lot Type: {item.lotType}</Text>
                                <Text style={styles.textWhite}>Total Lots: {item.lotsAvailable}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </>
    );
};

export default MapScreen;
