import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import IngredientViewCard from "../components/IngredientViewCard";

const RecipeDetailScreen = () => {
  const route = useRoute();
  const { params } = route;
  const nav = useNavigation();

  const recipe = params.recipe;

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: "",
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerRight: EditButton,
    });
  }, []); // run before showing anything to user

  const EditButton = () => {
    return (
      <Button
        title="Edit Recipe"
        onPress={() => {
          nav.navigate("Recipe Edit", { recipe });
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleStyle}>{recipe.recipeName}</Text>
      </View>

      <View style={{ marginTop: 30, marginLeft: 38 }}>
        <Text style={styles.subtitleStyle}>Notes</Text>

        <View style={styles.recipeNotes}>
          <Text>Recipe notes can go here.</Text>
        </View>

        <Text style={styles.subtitleStyle}>Ingredients</Text>
      </View>

      <ScrollView style={{ marginTop: 27 }}>
        {recipe.ingredients.map((ingredientSet, index) => (
          <IngredientViewCard
            key={index}
            ingredientName={ingredientSet.ingredientName}
            ingredientQty={ingredientSet.ingredientQty}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;

const styles = {
  titleStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginLeft: 33,
    marginTop: 9,
  },
  subtitleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D2D2D",
  },
  listStyle: {
    fontSize: 20,
    marginLeft: 40,
  },
  recipeNotes: {
    fontSize: 12,
    color: "#2D2D2D",
    height: 54,
    marginBottom: 52,
    marginTop: 7,
  },
};
