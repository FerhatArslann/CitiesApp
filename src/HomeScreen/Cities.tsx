// Cities.tsx
import { View, Text, StyleSheet } from "react-native";
import { CitiesNavigationProp, CitiesScreenProps } from "../../App";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const Cities: React.FC<CitiesScreenProps> = () => {
  const navigation = useNavigation<CitiesNavigationProp>();
  return(
    <View style={styles.container}>
    <Text>Home Screen</Text>
    <Button
      mode='contained'
      onPress={() => navigation.navigate('Locations', {city: 'Lahti'})}
    >
    Go to Lahti locations
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
});
