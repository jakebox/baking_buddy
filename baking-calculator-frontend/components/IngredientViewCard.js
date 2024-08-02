import React from "react";

import { Text } from "react-native";

import Card from "./Card";
import CardSection from "./CardSection";

const IngredientViewCard = ({ ingredientName, ingredientQty }) => {
  return (
    <Card backgroundColor="#EEEEEE" borderColor="0">
      <CardSection>
        <Text style={styles.ingredientName}>{ingredientName}</Text>
        <Text style={styles.ingredientQty}>{ingredientQty}</Text>
      </CardSection>
    </Card>
  );
};

const styles = {
  ingredientName: {
    borderRadius: 13,
    borderCurve: "continuous",
    fontSize: 16,
    fontWeight: 500,
    padding: 10,
    color: "#2D2D2D",
  },
  ingredientQty: {
    borderRadius: 13,
    borderCurve: "continuous",
    fontSize: 13,
    color: "#646464",
    textAlign: "right",
    marginLeft: 'auto'
  },
};

export default IngredientViewCard;
