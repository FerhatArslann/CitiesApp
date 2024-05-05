// Cities.tsx
import { View, Text, StyleSheet } from "react-native";
import { CitiesScreenProps } from "../../App";

export const Cities: React.FC<CitiesScreenProps> = () => {
  return(
    <View style={styles.container}>
    <Text>Home Screen</Text>
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
