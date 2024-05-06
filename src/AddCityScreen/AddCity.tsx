// AddCity.tsx

import { View, Text, StyleSheet } from "react-native";
import { AddCityScreenProps, iCity} from "../../App";
import { Button, TextInput } from "react-native-paper";
import { useRef, useState } from "react";
import uuid from 'react-native-uuid';
import { useCitiesDispatch, useCitiesSelector } from "../Store/CitiesStore";
import { addCity } from "../Store/Slices/CitiesSlice";

export const AddCity: React.FC<AddCityScreenProps> = () => {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const cities = useCitiesSelector((state) => state.cities.allCities);
  const dispatch = useCitiesDispatch();

  const cityRef = useRef<any>(null);
  // const countryRef = useRef<any>(null);
  // const {addCity} = useContext(CitiesContext);

  console.log(`AddCity ${JSON.stringify(cities)}`);

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
          dispatch(addCity(cityInfo));
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
