// App.tsx

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Cities } from './src/HomeScreen/Cities';
import { AddCity } from './src/AddCityScreen/AddCity';
import { Locations } from './src/LocationsScreen/Locations';
import { AddLocation } from './src/AddLocationScreen/AddLocation';
import { Info } from './src/InfoScreen/Info';
import { IconButton } from 'react-native-paper';

// Define Navigation route parameters
type RootStackParamList = {
  Cities: undefined; // No route parameters
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

function App(): React.JSX.Element {
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
          ></Stack.Screen>
        <Stack.Screen 
          name="Locations"
          component={Locations}
          ></Stack.Screen>
        <Stack.Screen 
          name="AddLocation" 
          component={AddLocation}
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
