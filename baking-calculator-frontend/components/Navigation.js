import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RecipeListScreen, ConverterScreen, RecipeEditScreen, RecipeDetailScreen } from "../screens/screens";

// Recipes stack
const RecipesStack = createNativeStackNavigator();

const RecipesStackGroup = () => {
  return (
    <RecipesStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <RecipesStack.Screen name="Recipes" component={RecipeListScreen} />
      <RecipesStack.Screen name="Recipe Details" component={RecipeDetailScreen} />
      <RecipesStack.Screen name="Recipe Edit" component={RecipeEditScreen} />
    </RecipesStack.Navigator>
  );
};

// Bottom tab navigation
const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    // we basically nest a navigator within a navigator
    // so when you navigate to "Recipes" from the Tab navigator
    // you are being taken to the RecipesStack navigator
    // this is why we hide the header here, so we don't double up
    // RecipesStack gets to manage the header
    <Tab.Navigator
      // initialRouteName="Edit"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="RecipesStack"
        component={RecipesStackGroup}
        options={{
          headerShown: false,
          tabBarLabel: "Recipes",
        }}
      />
      <Tab.Screen name="Converter" component={ConverterScreen} />
    </Tab.Navigator>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(0, 0, 0)",
    background: "#FFFFFF",
  },
};

export default function Navigation() {
  console.log("Reloaded app");
  return (
    <NavigationContainer theme={MyTheme}>
        <TabGroup />
    </NavigationContainer>
  );
}
