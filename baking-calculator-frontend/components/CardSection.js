import { View, Text } from 'react-native'
import React from 'react'

const CardSection = (props) => {
  return (
    <View style={style.rowContainer}>
        {props.children}
    </View>
  )
}

const style = {
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    marginTop: 3
  },
}


export default CardSection