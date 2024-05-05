// AddCity.tsx
import { View, Text, StyleSheet } from "react-native";
import { AddCityScreenProps} from "../../App";

export const AddCity: React.FC<AddCityScreenProps> = () => {
  return(
    <View style={styles.container}>
    <Text>AddCity Screen</Text>
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
