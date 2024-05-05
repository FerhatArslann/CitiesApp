// Locations.tsx
import { View, Text, StyleSheet } from "react-native";
import { LocationsScreenProps } from "../../App";

export const Locations: React.FC<LocationsScreenProps> = () => {
  return(
    <View style={styles.container}>
    <Text>Locations Screen</Text>
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
