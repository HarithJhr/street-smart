import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ManualSearch from './src/screens/ManualSearchScreen/ManualSearchScreen.js'; 
import FavouritesScreen from './src/screens/FavouritesScreen/FavouritesScreen.js';
import MapScreen from './src/screens/MapScreen/MapScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ManualSearch" component={ManualSearch} options={{ headerShown: false }}/>
        <Stack.Screen name="FavouritesScreen" component={FavouritesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Carpark Map', headerShown: false }}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
