import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 20,
    },
    topBanner: {
        backgroundColor: "#5f2da2",
        width: "100%",
        height: 160,
    },
    title: {
        fontSize: 38,
        fontWeight: "bold",
        marginTop: -22,
        marginBottom: 20,
        textAlign: "center",
        color: "#fff",
    },
    card: {
        padding: 25,
        marginVertical: 8,
        backgroundColor: "#rgba(95, 45, 162, 0.44)",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    carparkNumber: {
        fontWeight: "bold",
        color: "#fff",
    },
    textWhite: {
        color: "#fff",
    },
    heart: {
        color: "blue",
        width: 30,
        height: 30,
    },
    noFavorites: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4d4d4d",
        marginTop: 20,
    },
    backButton: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        position: "absolute",
        top: 70,
        left: 20,
    },
});