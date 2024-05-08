// Cities.tsx

import React from 'react';
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { List, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useCitiesSelector, useCitiesDispatch } from "../Store/CitiesStore";
import { deleteCity } from "../Store/Slices/CitiesSlice";
import { iCity } from '../../App';

export const Cities: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useCitiesDispatch();
  const cities = useCitiesSelector(state => state.cities.allCities);

  const handleDeleteCity = (cityId: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this city?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => dispatch(deleteCity(cityId)),
        style: 'destructive'
      }
    ]);
  };

  const renderItem = ({ item }: { item: iCity }) => (
    <List.Item
      title={`${item.name}, ${item.country}`}
      description={`Click to see locations in ${item.name}`}
      left={props => <List.Icon {...props} icon="city" />}
      onPress={() => navigation.navigate('Locations', { city: item.name })} // Käytetään objektia
      right={props => (
        <IconButton
          {...props}
          icon="delete"
          onPress={() => handleDeleteCity(item.id)}
        />
      )}
    />
  );

  // Renderöi erottimen jokaisen listaelementin välille
  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={renderSeparator} // Lisää tämä rivi
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',  // Varmista, että tämä väri on sopiva
    width: '100%'
  },
});
