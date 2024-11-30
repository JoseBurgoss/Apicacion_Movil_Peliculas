import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import AuthContext from './AuthContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const moviesCollectionRef = collection(db, "favorites");
      const q = query(moviesCollectionRef, where("userId", "==", user.uid));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFavorites(filteredData);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  const addFavorite = async (movie) => {
    try {
      const newFavorite = {
        ...movie,
        userId: user.uid,
      };
      const docRef = await addDoc(collection(db, "favorites"), newFavorite);
      setFavorites((prevFavorites) => [...prevFavorites, { ...newFavorite, id: docRef.id }]);
    } catch (err) {
      console.error('Error adding favorite:', err);
    }
  };

  const removeFavorite = async (movieId) => {
    try {
      const q = query(collection(db, "favorites"), where("movieId", "==", movieId), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, "favorites", docSnapshot.id));
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== docSnapshot.id));
      });
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;