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

// Define Navigation route parameters
type RootStackParamList = {
  Home: undefined; // No route parameters
  AddCity: {itemId: number; otherParam: string}; // Route param placeholder
};

// RootStackParamList provides the type safety
const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type AddCityScreenProps = NativeStackScreenProps<RootStackParamList, 'AddCity'>;

// Placeholders for two screens (ToDo: make a real component later)
const HomeScreen: React.FC<HomeScreenProps> = () => {
  return(
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const AddCityScreen: React.FC<AddCityScreenProps> = () => {
  return(
    <View style={styles.container}>
      <Text>AddCity Screen</Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="AddCity" component={AddCityScreen}></Stack.Screen>
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
