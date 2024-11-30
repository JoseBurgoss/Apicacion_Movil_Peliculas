import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import FavoritesContext from '../context/FavoritesContext';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Stars from '../shared/Stars';

const ProfileScreen = ({ navigation, route }) => {
  const { setIsLoggedIn } = route.params;
  const { user, logOut } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);
  const [newPassword, setNewPassword] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const q = query(collection(db, "reviews"), where("userId", "==", user.uid));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviews(filteredData);
    } catch (err) {
      console.error('Error al obtener reseñas:', err);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert('Éxito', 'Contraseña actualizada correctamente.');
      setNewPassword('');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      Alert.alert('Error', 'No se pudo actualizar la contraseña.');
    }
  };

  const OnLogout = (e) => {
    e.preventDefault();
    logOut();
    setIsLoggedIn(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.info}>Usuario: {user.displayName}</Text>
        <Text style={styles.info}>Email: {user.email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <Pressable style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.changePasswordText}>Cambiar Contraseña</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Películas Favoritas</Text>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.imgPath }} style={styles.poster} />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <Text style={styles.text}>No se encontraron películas favoritas.</Text>
        )}

        <Text style={styles.sectionTitle2}>Reseñas</Text>
        {reviews.length > 0 ? (
          <FlatList
            data={reviews}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{user.displayName}</Text>
                  <Stars title="Calificación" rating={item.rating} />
                </View>
                <Text style={styles.reviewContent}>{item.comment}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.reviewSeparator} />}
          />
        ) : (
          <Text style={styles.text}>No se encontraron reseñas.</Text>
        )}

        <Pressable style={styles.button} onPress={OnLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  changePasswordButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  changePasswordText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginBottom: 5,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  separator: {
    width: 10,
  },
  text: {
    fontSize: 16,
  },
  reviewItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 250, // Ajusta el ancho de las reseñas
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewContent: {
    fontSize: 14,
    color: '#555',
  },
  reviewSeparator: {
    width: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    minWidth: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;