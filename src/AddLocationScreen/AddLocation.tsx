// AddLocation.tsx

import { View, Text, StyleSheet } from "react-native";
import { AddLocationNavigationProp, AddLocationScreenProps} from "../../App";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export const AddLocation: React.FC<AddLocationScreenProps> = ({route}) => {
  const navigation = useNavigation<AddLocationNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      title: `Add location to ${route.params.city}`,
    })
  });
  
  return(
    <View style={styles.container}>
    <Text>AddLocation Screen of City: {route.params.city}</Text>
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
