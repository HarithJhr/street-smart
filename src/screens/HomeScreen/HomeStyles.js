import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#fff",
    },
    button: {
        marginVertical: 20,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        paddingLeft: 20,
    },
    buttonsContainer: {
        width: "100%",
        alignItems: "left",
        borderRadius: 20,
        padding: 20,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    highlightBox: {
        width: '80%', 
        backgroundColor: '#000',
        borderRadius: 20,
        // Shadow properties for iOS
        shadowColor: '#fff', // White shadow color
        shadowOffset: {
          width: 0,
          height: 10, // Shadow starts at the bottom
        },
        shadowOpacity: 0.3, // Adjust shadow opacity to make it more or less visible
        shadowRadius: 10, // Radius to spread the shadow
        // Shadow properties for Android
        elevation: 10, // Adjust elevation for shadow effect on Android
      },
    icon: {
        width: 20,
        height: 20,
    },
});
