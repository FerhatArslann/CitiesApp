// Cities.tsx

import React from 'react';
import { View, FlatList, Alert, StyleSheet } from "react-native";
import { List, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useCitiesSelector, useCitiesDispatch } from "../Store/CitiesStore";
import { deleteCity } from "../Store/Slices/CitiesSlice";
import { iCity } from '../../App';
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Kaupunkinäkymän pääkomponentti
export const Cities: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Cities'>>();
  const dispatch = useCitiesDispatch();
  const cities = useCitiesSelector(state => state.cities.allCities);

  // Kaupungin poistaminen
  const handleDeleteCity = (cityId: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this city?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => dispatch(deleteCity(cityId)), style: 'destructive' }
    ]);
  };

  // Listan renderöinti
  const renderItem = ({ item }: { item: iCity }) => (
    <List.Item
      title={`${item.name}, ${item.country}`} // Kaupungin nimi ja maa
      description={`Click to see locations in ${item.name}`} // Kuvaus
      left={props => <List.Icon {...props} icon="city" />}
      onPress={() => navigation.navigate('Locations', { city: item.name })} // Navigointi Locations-näkymään
      right={props => (
        <IconButton
          {...props}
          icon="delete"
          onPress={() => handleDeleteCity(item.id)} // Delete painike
        />
      )}
    />
  );

  // Renderöinti ja erottaminen viivalla elementtien välille
  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  // Komponentin renderöinti
  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

// Tyylien määrittely
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    width: '100%'
  },
});
