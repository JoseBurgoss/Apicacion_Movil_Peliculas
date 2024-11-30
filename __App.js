import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import {useState} from 'react';
import MovieDetailScreen from './screens/MovieDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn]= useState(false);
  
  return (
    <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={HomeScreen}initialParams={{name: 'Guest'}} options={{ headerShown: false }} />           
          <Stack.Screen name="SignIn" component={SignInScreen} initialParams={{name: 'Guest'}} options={{ headerShown: false }} />       */}
          {!isSignedIn ? (
          // Display SignInScreen if not signed in
          <Stack.Screen name="SignIn" component={SignInScreen}   options={{ headerShown: false }} /> 
        ) : (
          // Display HomeScreen if signed in
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        )}
         <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
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
