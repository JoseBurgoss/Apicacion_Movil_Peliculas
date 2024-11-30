import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, FlatList, Image, Keyboard } from 'react-native';
import React, { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AuthContext from '../context/AuthContext';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function MovieReviewForm({ setSelectedMovie, selectedMovie, comment, setComment, search, setSearch, searchResults, setSearchResults, searchItems }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  const handleSubmitReview = async () => {
    if (!selectedMovie || !comment || rating === 0) {
      alert('Por favor selecciona una película o serie, escribe una reseña y selecciona una calificación.');
      return;
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        movieId: selectedMovie.id,
        userId: user.uid,
        comment: comment,
        rating: rating,
        timestamp: new Date(),
      });
      alert('¡Reseña enviada exitosamente!');
      setComment('');
      setSelectedMovie(null);
      setRating(0);
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      alert('No se pudo enviar la reseña.');
    }
  };

  const clearComment = () => {
    setComment('');
    Keyboard.dismiss();
  };

  const handleStarPress = (value) => {
    setRating(value);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f8f8f8', bottom: 100 }}>
      <Text style={styles.header}>Reseñas</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar películas o series"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            searchItems(text);
          }}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => {
            setSearch('');
            setSearchResults([]);
          }} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {searchResults.length > 0 && search.length > 0 && (
        <View style={styles.searchResultsContainer}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchResultItem}
                onPress={() => {
                  setSelectedMovie(item);
                  setSearch(item.title || item.name);
                  setSearchResults([]);
                }}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                  style={styles.searchResultImage}
                />
                <View style={styles.searchResultTextContainer}>
                  <Text style={styles.searchResultText}>{item.title || item.name}</Text>
                  <Text style={styles.searchResultSubText}>Director: {item.director}</Text>
                  <Text style={styles.searchResultSubText}>Fecha de Estreno: {item.releaseDate || item.first_air_date}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Escribe tu reseña"
          value={comment}
          onChangeText={text => setComment(text)}
        />
        {comment.length > 0 && (
          <TouchableOpacity onPress={clearComment} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity key={value} onPress={() => handleStarPress(value)}>
            <Fontisto
              name={value <= rating ? "star" : "star-outline"}
              size={24}
              color={value <= rating ? "#FFD700" : "#ccc"}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmitReview}>
        <Text style={styles.buttonText}>Subir Reseña</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchContainer: {
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 3,
  },
  searchResultsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 300,
    borderRadius: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchResultImage: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 10,
  },
  searchResultTextContainer: {
    flex: 1,
  },
  searchResultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResultSubText: {
    fontSize: 14,
    color: '#555',
  },
  commentContainer: {
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 20,
  },
  textArea: {
    height: 100,
    width: '95%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});