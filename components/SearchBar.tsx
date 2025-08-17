import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useAppDispatch } from '@/hooks/redux';
import { setSearchQuery, clearSearch } from '@/store/searchSlice';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Dispatches the debounced search term to the Redux store whenever it changes.
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  // Clears the local search term state and dispatches an action to clear the search query in Redux.
  const handleClear = () => {
    setSearchTerm('');
    dispatch(clearSearch());
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#718096" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Name or number"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#A0AEC0"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={20} color="#718096" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '80%',
  },
  searchContainer: {
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
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    paddingVertical: 8,
    borderRadius: 12,
  },
  clearButton: {
    padding: 4,
  },
});
