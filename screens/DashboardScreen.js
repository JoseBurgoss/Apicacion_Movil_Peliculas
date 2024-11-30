import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieListScreen from './MovieListScreen';
import SeriesListScreen from './SeriesListScreen'; // Import the new SeriesListScreen
import ReviewScreen from './ReviewScreen';
import FavoritesScreen from './FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function DashboardScreen({navigation, route}) {
   
  return (
     <Tab.Navigator>
            <Tab.Screen 
              name="Movies" 
              component={MovieListScreen} 
              options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="film-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="Series" 
              component={SeriesListScreen} // Add the new SeriesListScreen
              options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="tv-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="AddReview" 
              component={ReviewScreen} 
              options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="Favorites" 
              component={FavoritesScreen} 
              options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="heart-outline" color={color} size={size} />
                ),
              }}
            />
    </Tab.Navigator>   
  )
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'}
})