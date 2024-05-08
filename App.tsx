// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Cities } from './src/HomeScreen/Cities';
import { AddCity } from './src/AddCityScreen/AddCity';
import Locations from './src/LocationsScreen/Locations';
import { AddLocation } from './src/AddLocationScreen/AddLocation';
import { Info } from './src/InfoScreen/Info';
import { IconButton } from 'react-native-paper';
import { Provider } from 'react-redux';
import store, { persistor } from './src/Store/CitiesStore';
import { PersistGate } from 'redux-persist/integration/react';
import { NativeStackNavigationProp, NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

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

export type CitiesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cities'>;
export type LocationsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Locations'>;
export type AddLocationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddLocation'>;


function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Cities' screenOptions={{ headerTitleAlign: 'center' }}>
              <Stack.Screen
                name='Cities'
                component={Cities}
                options={({ navigation }) => ({
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
              />
              <Stack.Screen
                name="AddCity"
                component={AddCity as React.ComponentType<any>}
                options={{
                  title: 'Add City'
                }}
              />
              <Stack.Screen
                name="Locations"
                component={Locations as React.ComponentType<any>}
                options={{
                  title: 'Locations of'
                }}
              />
              <Stack.Screen
                name="AddLocation"
                component={AddLocation as React.ComponentType<any>}
                options={{
                  title: 'Add More Locations'
                }}
              />
              <Stack.Screen
                name="Info"
                component={Info}
              />
            </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
