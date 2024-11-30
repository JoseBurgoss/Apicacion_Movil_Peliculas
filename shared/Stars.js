import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Stars({title, rating}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>  
      <Text>{`${title}: ${Math.round(rating)} Stars`}</Text>     
        <View style={styles.stars}>
          <MaterialIcons name="star-border" size={32} style={Math.round(rating) >=1? styles.starSelected : styles.starUnselected} />
          <MaterialIcons name="star-border" size={32} style={Math.round(rating) >=2? styles.starSelected : styles.starUnselected} />
          <MaterialIcons name="star-border" size={32} style={Math.round(rating) >=3? styles.starSelected : styles.starUnselected} />
          <MaterialIcons name="star-border" size={32} style={Math.round(rating) >=4? styles.starSelected : styles.starUnselected} />
          <MaterialIcons name="star-border" size={32} style={Math.round(rating) >=5? styles.starSelected : styles.starUnselected} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#FFA500',
   
  }
});