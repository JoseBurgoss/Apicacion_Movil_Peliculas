import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import SeriesDetailScreen from './screens/SeriesDetailScreen';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerTitle: 'CineMania' }} />
      <Stack.Screen name="SeriesDetailScreen" component={SeriesDetailScreen} options={{ headerTitle: 'CineMania' }} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = ({ setIsLoggedIn }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFA500',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#FFA500',
        drawerInactiveTintColor: 'gray',
      }}
    >
      <Drawer.Screen name="Pantalla Principal" component={MainStackNavigator} options={{ headerTitle: 'CineMania' }} />
      <Drawer.Screen name="Home" component={DashboardScreen} options={{ headerTitle: 'CineMania' }} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} initialParams={{ setIsLoggedIn }} options={{ headerTitle: 'CineMania' }} />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <NavigationContainer>
          {!isLoggedIn ? (
            <Stack.Navigator>
              <Stack.Screen name="SignIn" component={SignInScreen} initialParams={{ setIsLoggedIn }} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} initialParams={{ setIsLoggedIn }} />
            </Stack.Navigator>
          ) : (
            <DrawerNavigator setIsLoggedIn={setIsLoggedIn} />
          )}
        </NavigationContainer>
      </FavoritesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});