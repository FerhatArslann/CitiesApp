// AddLocation.tsx
import { View, Text, StyleSheet } from "react-native";
import { AddLocationScreenProps} from "../../App";

export const AddLocation: React.FC<AddLocationScreenProps> = () => {
  return(
    <View style={styles.container}>
    <Text>AddLocation Screen</Text>
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
