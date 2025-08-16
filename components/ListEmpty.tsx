import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ListEmpty = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text || 'No Pokémon found.'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#718096',
  },
});
