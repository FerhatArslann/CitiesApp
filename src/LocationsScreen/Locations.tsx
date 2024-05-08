// Locations.tsx

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCitiesSelector, useCitiesDispatch } from "../Store/CitiesStore";
import { IconButton } from 'react-native-paper';
import { iCity, RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface LocationsScreenProps {
  route: {
    params: {
      city: string;
    };
  };
}

const Locations: React.FC<LocationsScreenProps> = ({ route }) => {
  const { city } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Locations'>>();
  const dispatch = useCitiesDispatch();
  const cities = useCitiesSelector(state => state.cities.allCities);
  const cityData = cities.find((c: iCity) => c.name === city);

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
});

export default Locations;
