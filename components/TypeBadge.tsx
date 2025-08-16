import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTypeColor } from '@/utils/pokemonTypes';

interface TypeBadgeProps {
  type: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const backgroundColor = getTypeColor(type);

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{type.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});