// Info.tsx

import { View, Text, StyleSheet } from "react-native";

const developerName = "Ferhat Arslan";
const appVersion = "1.0.0";

export const Info: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Cities App!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>App Information</Text>
        <Text style={styles.infoText}>Developed by: {developerName}</Text>
        <Text style={styles.infoText}>Version: {appVersion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  infoContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
  }
});
