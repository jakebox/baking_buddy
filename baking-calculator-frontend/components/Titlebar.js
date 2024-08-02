import { View, Text } from "react-native";
import React from "react";

const Titlebar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Baking App</Text>
    </View>
  );
};

const styles = {
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 6},
    shadowOpacity: 0.1,
    marginTop: 13,
    marginBottom: 30,
  }
};

export default Titlebar;
