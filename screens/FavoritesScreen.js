import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import FavoritesContext from '../context/FavoritesContext';

export default function FavoritesScreen() {
  const screenWidth = Dimensions.get('window').width;
  const widthPercentage = 0.6; // Por ejemplo, 60% del ancho de la pantalla
  const width = screenWidth * widthPercentage;
  const { favorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favoritos</Text>
      <ScrollView>
        {favorites.map((fav, index) => (
          <View style={styles.item} key={index}>
            <Image
              source={{ uri: fav.imgPath }}
              style={styles.poster}
            />
            <View style={{ flexDirection: 'column', width: width }}>
              <Text style={styles.title}>{fav.title}</Text>
              <Text style={styles.text}>{fav.overview}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#777',
  },
});