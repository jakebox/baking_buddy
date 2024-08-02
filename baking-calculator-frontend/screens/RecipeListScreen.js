import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";

// Components
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";

// Nav
import { useNavigation } from "@react-navigation/native";

// Data
import { UseRecipeData } from "../hooks/recipeQuery";

const RecipeListScreen = () => {
  const nav = useNavigation();

  useLayoutEffect(() => {
    nav.setOptions(navOptions);
  }, []);

  const { isLoading, data: recipes, error } = UseRecipeData();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Error fetching data from server {JSON.stringify(error.message)}</Text>
      </View>
    );
  }

  const renderItem = (props) => {
    return <RecipeCard recipe={props.item} />;
  };

  const keyExtractor = (recipeItem) => recipeItem._id;

  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList style={styles.list} data={recipes} renderItem={renderItem} keyExtractor={keyExtractor} /> */}
      <ScrollView style={styles.list} overScrollMode="always">
        {recipes.map((r, index) => (
          <RecipeCard key={index} recipe={r} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  container: { flex: 1 }, // stop ScrollView from being cut off
  list: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const navOptions = {
  headerTitle: "My Recipes",
  headerShadowVisible: false,
  headerBlurEffect: "regular",
  headerTitleStyle: {
    fontSize: 26,
  },
};
