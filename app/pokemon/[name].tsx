import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { TypeBadge } from '@/components/TypeBadge';
import { formatPokemonName, formatStatName } from '@/utils/pokemonTypes';

const { width } = Dimensions.get('window');

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { pokemon, description, isLoading, error } = usePokemonDetail(name!);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !pokemon) {
    return <ErrorMessage message="Failed to load Pokémon details" onRetry={() => router.back()} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{formatPokemonName(pokemon.name)}</Text>
        <Text style={styles.headerNumber}>#{pokemon.id.toString().padStart(3, '0')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Types</Text>
            <View style={styles.typesContainer}>
              {pokemon.types.map((type) => (
                <TypeBadge key={type.type.name} type={type.type.name} />
              ))}
            </View>
          </View>

          {description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Physical Stats</Text>
            <View style={styles.physicalStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Height</Text>
                <Text style={styles.statValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Base Experience</Text>
                <Text style={styles.statValue}>{pokemon.base_experience}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            {pokemon.stats.map((stat) => {
              const percentage = (stat.base_stat / 255) * 100;
              return (
                <View key={stat.stat.name} style={styles.statRow}>
                  <Text style={styles.statName}>{formatStatName(stat.stat.name)}</Text>
                  <Text style={styles.statNumber}>{stat.base_stat}</Text>
                  <View style={styles.statBarContainer}>
                    <View 
                      style={[styles.statBar, { width: `${percentage}%` }]} 
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Abilities</Text>
            {pokemon.abilities.map((ability) => (
              <View key={ability.ability.name} style={styles.abilityItem}>
                <Text style={styles.abilityName}>
                  {formatPokemonName(ability.ability.name.replace('-', ' '))}
                </Text>
                {ability.is_hidden && (
                  <Text style={styles.hiddenLabel}>Hidden</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerNumber: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  physicalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    fontSize: 14,
    color: '#4A5568',
    width: 80,
    fontWeight: '500',
  },
  statNumber: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
    marginRight: 12,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: '#3182CE',
    borderRadius: 4,
  },
  abilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityName: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  hiddenLabel: {
    fontSize: 12,
    color: '#E53E3E',
    backgroundColor: '#FED7D7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
    fontWeight: '600',
  },
});