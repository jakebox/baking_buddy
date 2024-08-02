import React from "react";
import { Text, View, Pressable, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Card from "./Card";
import CardSection from "./CardSection";

const RecipeCard = ({ recipe }) => {
  const nav = useNavigation(); // hook - https://reactnavigation.org/docs/use-navigation/

  const onPressFunction = () => {
    nav.navigate("Recipe Details", { recipe }); // shorthand for { recipe: recipe }
  };

  return (
    <TouchableOpacity onPress={onPressFunction}>
      <Card backgroundColor="#F9F9F9" minHeight={80}>
        <CardSection>
          <Text style={styles.recipeIcon}>{recipe.icon}</Text>
          <Text style={styles.recipeName}>{recipe.recipeName}</Text>
          <Text style={styles.arrow}>→</Text>
        </CardSection>
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  recipeName: {
    fontSize: 18,
    color: "#383838",
  },
  recipeIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  arrow: {
    fontSize: 24,
    color: "#A9A9A9",
    marginLeft: "auto",
  },
  card: {},
};

export default RecipeCard;
