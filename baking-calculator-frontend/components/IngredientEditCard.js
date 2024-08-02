import React, { useState } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";

import Card from "./Card";
import CardSection from "./CardSection";

const IngredientEditCard = ({ ingredientName, ingredientQty, onValueChange, onDelete }) => {
  const [name, setName] = useState(ingredientName);
  const [qty, setQty] = useState(ingredientQty);

  const handleNameChange = (text) => {
    setName(text);
    onValueChange({ ingredientName: text, ingredientQty: qty });
  };

  const handleQtyChange = (val) => {
    setQty(val);
    onValueChange({ ingredientName: name, ingredientQty: val });
  };

  return (
    <Card backgroundColor="#FFFFFF" borderColor="0">
      <CardSection>
        <TextInput
          style={styles.ingredientName}
          placeholder="ingredient"
          value={ingredientName}
          onChangeText={handleNameChange}
          autoComplete="off"
        />
        <TextInput
          style={styles.ingredientQty}
          placeholder="amount"
          value={ingredientQty}
          onChangeText={handleQtyChange}
          autoComplete="off"
        />
        <Button title="X" onPress={() => onDelete()} />
      </CardSection>
    </Card>
  );
};

const styles = {
  ingredientName: {
    borderRadius: 13,
    borderCurve: "continuous",
    marginRight: 15,
    height: 40,
    width: 170,
    padding: 10,
    color: "#5B5757",
    backgroundColor: "rgba(240, 240, 240, 0.7)",
    textAlign: "center",
  },
  ingredientQty: {
    borderRadius: 13,
    borderCurve: "continuous",
    height: 40,
    width: 110,
    padding: 10,
    color: "#5B5757",
    backgroundColor: "rgba(240, 240, 240, 0.7)",
    textAlign: "center",
    marginRight: 7,
  },
};

export default IngredientEditCard;
