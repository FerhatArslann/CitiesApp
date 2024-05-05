// App.tsx

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Cities } from './src/HomeScreen/Cities';
import { AddCity } from './src/AddCityScreen/AddCity';
import { Locations } from './src/LocationsScreen/Locations';
import { AddLocation } from './src/AddLocationScreen/AddLocation';
import { Info } from './src/InfoScreen/Info';
import { IconButton } from 'react-native-paper';

import uuid from 'react-native-uuid';

// Interfaces for data content of the application
export interface iLocation {
  id: string;
  name: string;
  info: string;
};

export interface iCity {
  id: string;
  name: string;
  country: string;
  locations?: iLocation[];
};

const testLahti: iCity = {
  id: uuid.v4().toString(),
  name: 'Lahti',
  country: 'Finland',
  locations:  [
    {
      name: 'Hyppyrimäki',
      info: 'Hienot nähtävyydet tornista',
      id: uuid.v4().toString(),
    },
    {
      name: 'Jäähalli',
      info: 'Pelikaanit\ kotiareena',
      id: uuid.v4().toString(),
    }
  ]
}

const testData: iCity[] = [
  testLahti
];

// Define Navigation route parameters
type RootStackParamList = {
  Cities: {cities: iCity[], addCity: (city: iCity) => void}; // No route parameters
  AddCity: undefined; // Route param placeholder
  Locations: {city: string}; // Route param placeholder
  AddLocation: {city: string}; // Route param placeholder
  Info: undefined;
};

// RootStackParamList provides the type safety
const Stack = createNativeStackNavigator<RootStackParamList>();

export type CitiesScreenProps = NativeStackScreenProps<RootStackParamList, 'Cities'>;
export type AddCityScreenProps = NativeStackScreenProps<RootStackParamList, 'AddCity'>;
export type LocationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Locations'>;
export type AddLocationScreenProps = NativeStackScreenProps<RootStackParamList, 'AddLocation'>;
export type InfoScreenProps = NativeStackScreenProps<RootStackParamList, 'Info'>;

export type CitiesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cities'>;
export type LocationsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Locations'>;
export type AddLocationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddLocation'>;


function App(): React.JSX.Element {
  const [cities, setCities] = useState<iCity[]>(testData);

  const addCity = (city: iCity) => {
    // Placeholder
    console.log(`adding a city ${JSON.stringify(city)}`);
  }

  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Cities'
        screenOptions={{
          headerTitleAlign: 'center',
        }}
        >
        <Stack.Screen
          name='Cities'
          component={Cities}
          initialParams={{cities, addCity}}
          options={({navigation})=>({
            title: 'Cities App',
            headerLeft: () => (
              <IconButton 
                icon='information-outline'
                onPress={() => navigation.navigate('Info')}
              />
            ),
            headerRight: () => (
              <IconButton 
                icon='plus-circle-outline'
                onPress={() => navigation.navigate('AddCity')}
              />
            )            
          })}
          ></Stack.Screen>
        <Stack.Screen 
          name="AddCity" 
          component={AddCity}
          options={{
            title: 'Add City'
          }}
          ></Stack.Screen>
        <Stack.Screen 
          name="Locations"
          component={Locations}
          options={{
            title: 'Locations of'
          }}          
          ></Stack.Screen>
        <Stack.Screen 
          name="AddLocation" 
          component={AddLocation}
          options={{
            title: 'Add Location to'
          }}         
          ></Stack.Screen>
        <Stack.Screen 
          name="Info" 
          component={Info}
          ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
