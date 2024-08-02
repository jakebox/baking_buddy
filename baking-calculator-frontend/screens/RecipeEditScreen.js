import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import IngredientEditCard from "../components/IngredientEditCard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { patchRecipe } from "../hooks/recipeQuery";

const RecipeEditScreen = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { params } = route;

  const recipe = params.recipe;

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: "Editing '" + recipe.recipeName + "'",
      // headerLeft: SaveButton,
      animation: "slide_from_bottom",
      headerShadowVisible: false,
    });
  }, []);

  const SaveButton = () => {
    return (
      <Button
        title="Save"
        onPress={() => {
          saveRecipe();
          // nav.goBack();
        }}
      />
    );
  };

  const [ingredients, setIngredients] = useState([...recipe.ingredients]);

  const handleIngredientChange = (index, updatedIngredient) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = updatedIngredient;
    setIngredients(updatedIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1); // Remove the ingredient at the specified index
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredientName: "", ingredientQty: "" }]);
  };

  const saveRecipe = async () => {
    Keyboard.dismiss();
    const updatedIngredients = ingredients.filter((ingredientSet) => ingredientSet.ingredientName.trim() !== "");
    setIngredients(updatedIngredients);

    const formattedRecipe = {
      recipeName: recipe.recipeName, // Replace with the actual recipe name
      ingredients: updatedIngredients,
    };

    try {
      await patchRecipe(formattedRecipe, recipe._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={["left", "right", "bottom"]}>
        <SaveButton />
        <Text style={styles.editDetails}>Edit Details</Text>
        <Text style={styles.editIngredients}>Edit Ingredients</Text>
        {ingredients.map((ingredientSet, index) => (
          <IngredientEditCard
            key={index}
            ingredientName={ingredientSet.ingredientName}
            ingredientQty={ingredientSet.ingredientQty}
            onValueChange={(updatedValues) => handleIngredientChange(index, updatedValues)}
            onDelete={() => handleDeleteIngredient(index)}
          />
        ))}
        <View style={styles.addIngredientWrapper}>
          <Button title="Add Ingredient" color="#2D2D2D" style={styles.addIngredient} onPress={addIngredient} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RecipeEditScreen;

const styles = StyleSheet.create({
  editDetails: {
    fontSize: 24,
    marginLeft: 25,
    marginBottom: 15,
    marginTop: 29,
    fontWeight: "bold",
  },
  editIngredients: {
    fontSize: 24,
    marginLeft: 25,
    marginBottom: 15,
    fontWeight: "bold",
  },
  addIngredient: {
    fontSize: 20,
  },
  addIngredientWrapper: {
    backgroundColor: "#C8E5FF",
    width: 180,
    height: 40,
    justifyContent: "center",
    borderRadius: 15,
    borderCurve: "continuous",
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
