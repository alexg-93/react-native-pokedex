import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { formatPokemonName } from '@/utils/pokemonTypes';
import type { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const handlePress = () => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: pokemon.image }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
        <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    minWidth: 150,
    maxWidth: 180,
  },
  imageContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
    textAlign: 'center',
  },
  id: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
});