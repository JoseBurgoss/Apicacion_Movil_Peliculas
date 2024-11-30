import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AboutScreen({route}) {
    const {name} = route.params;
  return (
    <View style={styles.container}>
      <Text>AboutScreen</Text>
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'}
})