import { SafeAreaView, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <SafeAreaView style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
      <ActivityIndicator style={{}}/>
    </SafeAreaView>
  );
};

export default Loading;
