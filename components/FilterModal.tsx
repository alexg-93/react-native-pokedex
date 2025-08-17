import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (minStrength: number) => void;
  onClear: () => void;
  currentStrength: number | null;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  onClear,
  currentStrength,
}) => {
  const [minStrength, setMinStrength] = useState<string>('');

  // Synchronizes the local minStrength state with the currentStrength prop.
  useEffect(() => {
    if (currentStrength !== null) {
      setMinStrength(currentStrength.toString());
    } else {
      setMinStrength('');
    }
  }, [currentStrength]);

  // Handles the application of the filter, parsing the input and calling the onApply prop.
  const handleApply = () => {
    const strength = parseInt(minStrength, 10);
   
      onApply(strength);
    
  };

  // Updates the minStrength state, ensuring only numeric values are accepted.
  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setMinStrength(numericValue);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Filter by Strength</Text>
          <Text style={styles.label}>Minimum Attack Strength:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={minStrength}
            onChangeText={handleChangeText}
            placeholder="e.g., 50"
            placeholderTextColor="#999"
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={onClear}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={handleApply}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#4A90E2',
    marginLeft: 8,
  },
  clearButton: {
    backgroundColor: '#D0021B',
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
});

export default FilterModal;
