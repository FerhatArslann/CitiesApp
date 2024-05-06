// Locations.tsx

import { View, Text, StyleSheet } from "react-native";
import { CitiesNavigationProp, LocationsScreenProps } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { IconButton } from "react-native-paper";

export const Locations: React.FC<LocationsScreenProps> = ({route}) => {
  const navigation = useNavigation<CitiesNavigationProp>();
  useEffect(() => {
    navigation.setOptions({
      title: `Locations of ${route.params.city}`,

      headerRight: () => (
        <IconButton
          icon='plus-circle-outline'
          onPress={() => navigation.navigate('AddLocation', {city: route.params.city})}
        />
      )
    })
  });
  return(
    <View style={styles.container}>
      <Text>Locations Screen of City: {route.params.city}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
