// Locations.tsx

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCitiesSelector, useCitiesDispatch } from "../Store/CitiesStore";
import { IconButton } from 'react-native-paper';
import { deleteLocation } from "../Store/Slices/CitiesSlice";
import { iCity, iLocation } from '../../App';  // Varmista, että nämä tyypit ovat määritelty App.tsx:ssä

interface LocationsScreenProps {
  route: {
    params: {
      city: string;
    };
  };
}

const Locations: React.FC<LocationsScreenProps> = ({ route }) => {
  const { city } = route.params;
  const navigation = useNavigation();
  const dispatch = useCitiesDispatch();
  const cities = useCitiesSelector(state => state.cities.allCities);
  const cityData = cities.find((c: { name: string; }) => c.name === city);

  const handleDeleteLocation = (location: iLocation) => {
    Alert.alert("Confirm Delete", `Are you sure you want to delete the location ${location.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => dispatch(deleteLocation({ cityId: city, locationId: location.id })),
        style: 'destructive'
      }
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Locations of ${city}`,
      headerRight: () => (
        <IconButton
          icon='plus-circle-outline'
          onPress={() => navigation.navigate('AddLocation', { city })}
        />
      )
    });
  }, [city, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cityData?.locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationInfo}>{item.info}</Text>
            </View>
            <IconButton
              icon="delete"
              onPress={() => handleDeleteLocation(item)}
              style={styles.deleteIcon}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  locationName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  locationInfo: {
    fontSize: 14
  },
  deleteIcon: {
    // Customize as needed
  }
});

export default Locations;
