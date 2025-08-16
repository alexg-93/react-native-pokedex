import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { usePokemonList } from '@/hooks/usePokemonList';
import { PokemonCard } from '@/components/PokemonCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { Pokemon } from '@/types/pokemon';
import FilterModal from '@/components/FilterModal';
import { FilterButton } from '@/components/FilterButton';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setMinStrength } from '@/store/searchSlice';
import { ListEmpty } from '@/components/ListEmpty';

export default function HomeScreen() {
  const { pokemon, isLoading, isFetching, hasMore, error, loadMore, refresh } =
    usePokemonList();

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const minStrength = useAppSelector((state) => state.search.minStrength);

  const toggleFilterModal = () => setFilterModalVisible(!isFilterModalVisible);

  const applyFilter = (strength: number) => {
    dispatch(setMinStrength(strength));
    setFilterModalVisible(false);
  };

  const clearFilter = () => {
    dispatch(setMinStrength(null));
    setFilterModalVisible(false);
  };

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <PokemonCard pokemon={item} />
  );

  const renderFooter = () => {
    if (!isFetching || !hasMore) return null;
    return <LoadingSpinner size="small" />;
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message="Failed to load Pokémon" onRetry={refresh} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Pokedex'}</Text>
      </View>

      <View style={styles.searchFilterContainer}>
        <SearchBar />
        <FilterButton
          onPress={toggleFilterModal}
          isFilterActive={minStrength !== null}
        />
      </View>

      <FlatList
        data={pokemon}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmpty}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={toggleFilterModal}
        onApply={applyFilter}
        onClear={clearFilter}
        currentStrength={minStrength}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 32, fontWeight: '700', color: '#2D3748', marginBottom: 8 },
  list: { paddingHorizontal: 10, paddingBottom: 20 },
  searchFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
