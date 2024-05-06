// AddCity.tsx

import { View, Text, StyleSheet } from "react-native";
import { AddCityScreenProps, iCity} from "../../App";
import { Button, TextInput } from "react-native-paper";
import { useContext, useRef, useState } from "react";
import { CitiesContext } from "../Context/CitiesContext";
import uuid from 'react-native-uuid';

export const AddCity: React.FC<AddCityScreenProps> = () => {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const cityRef = useRef<any>(null);
  // const countryRef = useRef<any>(null);

  const {addCity} = useContext(CitiesContext);

  return(
    <View style={styles.container}>
      <Text>AddCity Screen</Text>
      <TextInput
        label="City name"
        mode="outlined"
        value={city}
        ref={cityRef}
        style={styles.intext}
        onChangeText={(city) => setCity(city)}
        />
      <TextInput
        label="Country"
        mode="outlined"
        value={country}
        style={styles.intext}
        onChangeText={(country) => setCountry(country)}
        />
      <Button
        mode="outlined"
        style={styles.intext}
        onPress={() => {
          const cityInfo: iCity = {
            name: city,
            country: country,
            id: uuid.v4().toString(),
            locations: []
          };
          addCity(cityInfo);
          setCity('');
          setCountry('');
          // User stays in the screen and focus in the 1st input field.
          // Call navigate.back() if user should return to previous screen.
          cityRef.current?.focus();
        }}
        >
          Add City   
      </Button>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intext: {
    width: "80%",
    margin: 10,
  }
});
