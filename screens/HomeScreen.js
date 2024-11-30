import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MovieListScreen from './MovieListScreen';
import SeriesListScreen from './SeriesListScreen';
import ReviewScreen from './ReviewScreen';
import FavoritesScreen from './FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation, route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Películas') {
            iconName = 'film-outline';
          } else if (route.name === 'Series') {
            iconName = 'tv-outline';
          } else if (route.name === 'Reseñas') {
            iconName = 'chatbox-ellipses-outline';
          } else if (route.name === 'Favoritos') {
            iconName = 'heart-outline';
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5,
          height: 80, // Ajusta la altura del panel
          paddingBottom: 25, // Ajusta el padding inferior
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Películas" 
        component={MovieListScreen} 
        options={{ 
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Series"
        component={SeriesListScreen}
        options={{
          title: "Series",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Reseñas"
        component={ReviewScreen}
        options={{
          title: "Reseñas",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}