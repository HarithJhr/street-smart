import { Text, View, Button, StatusBar, TouchableOpacity, Image } from "react-native";
import styles from "./HomeStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            
            <StatusBar
                barStyle="light-content"
                backgroundColor="#000"
            />

            {/* APP NAME */}
            <Text style={styles.title}>Street Smart</Text>
            
            {/* Button Container */}
            {/* View component adds the glowing effect */}
            <View style={styles.highlightBox}>
                <LinearGradient 
                    style={styles.buttonsContainer}
                    colors={["transparent", "rgba(55,117,159,0.4)"]}>

                    {/* MANUAL SEARCH BUTTON */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ManualSearch")}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <Image source={require('../../../assets/search.png')} style={styles.icon} />
                            <Text style={styles.buttonText}>Manual Search</Text>
                        </View>
                    </TouchableOpacity>

                    {/* MAP VIEW BUTTON */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MapScreen")}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <Image source={require('../../../assets/map.png')} style={styles.icon} />
                            <Text style={styles.buttonText}>Map View</Text>
                        </View>
                    </TouchableOpacity>

                    {/* FAVOURITES BUTTON */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("FavouritesScreen")}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <Image source={require('../../../assets/heart_line.png')} style={styles.icon} />
                            <Text style={styles.buttonText}>Favourites</Text>
                        </View>
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        </View>
    );
}
