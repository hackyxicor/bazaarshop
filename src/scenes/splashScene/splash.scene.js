import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function SplashScreen({ }) {
  return (
    <View style={styles.container} >
      <Text>Hii</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default SplashScreen;