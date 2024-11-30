import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ReviewScreen from '../screens/ReviewScreen'
import { createStackNavigator } from '@react-navigation/bottom-tabs';
import MovieViewScreen from '../screens/MovieListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';


const Stack = createStackNavigator();

export default function HomeScreen({navigation, route}) {
   
  return (
    <Stack.Navigator>   
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'}
})