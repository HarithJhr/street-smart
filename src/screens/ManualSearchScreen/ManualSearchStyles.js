import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 20,
    },
    searchContainer: {
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
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
        marginBottom: 5,
    },
    textWhite: {
        color: "#fff",
    },
    heart: {
        color: "blue",
        width: 30,
        height: 30,
    },
    switchSelector: {
        marginBottom: 50,
    },
    searchBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        height: 56,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginTop: -28,
        marginBottom: 10,
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