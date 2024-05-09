// AddCity.tsx

import { View, Text, StyleSheet, Alert } from "react-native";
import { AddCityScreenProps, iCity } from "../../App";
import { Button, TextInput } from "react-native-paper";
import { useRef, useState } from "react";
import uuid from 'react-native-uuid';
import { useCitiesDispatch, useCitiesSelector } from "../Store/CitiesStore";
import { addCity } from "../Store/Slices/CitiesSlice";

// Komponentti kaupungin lisäämiselle
export const AddCity: React.FC<AddCityScreenProps> = () => { 
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const cities = useCitiesSelector((state) => state.cities.allCities); // Haetaan kaupunkien tila
  const dispatch = useCitiesDispatch(); // Haetaan dispatch-funktio toimintojen suorittamiseen

  const cityRef = useRef<any>(null); 

  // Funktio kaupungin lisäämiseen
  const handleAddCity = () => {
    const cityInfo: iCity = {
      name: city,
      country: country,
      id: uuid.v4().toString(),
      locations: []
    };
    // Tarkistetaan, onko kaupunki jo olemassa
    if (cities.some((c: { name: string; }) => c.name === cityInfo.name)) {
      Alert.alert("City Exists", "This city already exists in the list.", [{ text: "OK" }]);
      return;
    }
    // Lisätään kaupunki Reduxin kautta
    dispatch(addCity(cityInfo));
    setCity('');
    setCountry('');
    cityRef.current?.focus(); // Asetetaan fokus takaisin kaupungin nimikenttään
  };

  // Konsoliloki (debuggausta varten)
  console.log(`AddCity ${JSON.stringify(cities)}`);

  // Komponentin renderöinti
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Add details of the city</Text>
      <TextInput
        label="City name"
        mode="outlined"
        value={city}
        onChangeText={setCity}
        ref={cityRef}
        style={styles.intext}
        />
      <TextInput
        label="Country"
        mode="outlined"
        value={country}
        onChangeText={setCountry}
        style={styles.intext}
        />
      <Button
        mode="outlined"
        onPress={handleAddCity}
        style={styles.button}
      >
        Add City
      </Button>  
    </View>
  );
}

// Tyylitiedot
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  intext: {
    width: "80%",
    margin: 10,
  },
  button: {
    width: "80%",
    marginTop: 10,
  }
});
