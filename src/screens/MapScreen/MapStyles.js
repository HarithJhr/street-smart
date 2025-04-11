import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
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
    map: {
        height: '50%',
        width: '100%',
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    card: {
        padding: 25,
        marginVertical: 8,
        backgroundColor: "#rgba(95, 45, 162, 0.44)",
        borderRadius: 20,
    },
    resultsContainer: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        height: '50%',
    },
    carparkNumber: {
        fontWeight: 'bold',
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
    switchSelector: {
        marginBottom: 50,
    },
    textWhite: {
        color: "#fff",
    },
    backButton: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        position: "absolute",
        top: 70,
        left: "5%",
    },
    locationButton: {
        fontSize: 30,
        width: 30,
        height: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        position: "absolute",
        top: 74,
        left: "85%",
    },
    loadingText: {
        position: 'absolute',
        width: '100%',
        zIndex: 4,
        top: '35%',
    },
});