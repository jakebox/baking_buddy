import { View, Text } from "react-native";
import React from "react";

const Card = (props) => {

  const backgroundColor = props.backgroundColor;
  // const borderWidth = props.borderWidth;

  const styles = {
    containerStyle: {
      flexDirection: "column",
      justifyContent: 'center',
      borderColor: "#ddd",
      backgroundColor: backgroundColor || '#EEE',
      // borderWidth: borderWith || 1,
      borderRadius: 10,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 13,
      minWidth: 300,
      marginLeft: 33,
      marginRight: 33,
      minHeight: props.minHeight || 50
    },
  };

  return <View style={styles.containerStyle}>{props.children}</View>;
};

export default Card;
