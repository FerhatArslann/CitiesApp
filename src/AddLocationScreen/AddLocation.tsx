// AddLocation.tsx

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCitiesDispatch, useCitiesSelector } from '../Store/CitiesStore';
import uuid from 'react-native-uuid';
import { addLocation } from '../Store/Slices/CitiesSlice';
import { iLocation } from '../../App';

interface AddLocationScreenProps {
  route: {
    params: {
      city: string;
    };
  };
}

export const AddLocation: React.FC<AddLocationScreenProps> = ({ route }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const navigation = useNavigation();
  const dispatch = useCitiesDispatch();

  const cities = useCitiesSelector(state => state.cities.allCities);
  const cityData = cities.find((c: { name: string; }) => c.name === route.params.city);

  const nameRef = useRef<any>(null);

  const handleAddLocation = () => {
    // Check if location already exists
    const existingLocation = cityData?.locations?.some((loc: { name: string; }) => loc.name.toLowerCase() === name.toLowerCase());
    if (existingLocation) {
      Alert.alert("Location Exists", "This location already exists in this city.", [{ text: "OK" }]);
      return;
    }

    if (name.trim() && description.trim()) {
      const newLocation: iLocation = {
        id: uuid.v4().toString(),
        name,
        info: description
      };
      dispatch(addLocation({ cityId: route.params.city, location: newLocation }));
      setName('');
      setDescription('');
      if (nameRef.current) {
        nameRef.current.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add location details to the {route.params.city}</Text>
      <TextInput
        label="Location name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        ref={nameRef}
        autoCapitalize="words"
        mode="outlined"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        mode="outlined"
      />
      <Button
        mode="outlined"
        onPress={handleAddLocation}
        style={styles.button}
      >
        Add Location
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '90%',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: '90%',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
  }
});

export default AddLocation;
