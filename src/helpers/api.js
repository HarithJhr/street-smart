import axios from "axios";
import { URA_API_KEY } from "@env";


// Generate token from Urban Redevelopment Authority (URA) website
export const getToken = async () => {
    try {
        // GET request to generate token
        const response = await axios.get(
            "https://www.ura.gov.sg/uraDataService/insertNewToken.action",
            {
                headers: {
                    AccessKey: URA_API_KEY,
                },
            }
        );

        // Check if the token was generated successfully
        if (response.data.Status === "Success") {
            // Return the generated token
            return response.data.Result;
        } else {
            console.error("Failed to get token:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
};


// Fetch data from Urban Redevelopment Authority (URA) API
export const fetchCarParks = async (_searchQuery, _lotType) => {
    try {
        const token = await getToken();
        const response = await axios.get(
            "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability",
            {
                headers: {
                    AccessKey: URA_API_KEY,
                    Token: token, // Replace <generated_token> with your actual token
                },
            }
        );

        // Extract relevant data (car park data) from the response
        const data = response.data.Result;

        // Filter car parks by the user's input
        const filteredCarParks = data.filter((cp) =>
            cp.carparkNo.includes(_searchQuery.toUpperCase()) &&
            cp.lotType === _lotType
        );

        // return the filtered car parks
        return filteredCarParks;
    } catch (error) {
        console.error("Error 123 fetching car park data:", error);
    }
};
