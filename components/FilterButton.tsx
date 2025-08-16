import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Sliders } from 'lucide-react-native';

type FilterButtonProps = {
  onPress: () => void;
  isFilterActive: boolean;
};

export const FilterButton: React.FC<FilterButtonProps> = ({ onPress, isFilterActive }) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Sliders color={'#000'} />
      {isFilterActive && <View style={styles.indicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    height: 50,
    width: 40,
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D0021B',
  },
});