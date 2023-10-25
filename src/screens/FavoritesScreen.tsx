import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { MEALS } from "../../data/dummyData";
import MealsList from "../components/_molecules/MealsList/MealsList";
import { getFavoriteIds } from "../store/selectors";

function FavoritesScreen() {
  const favoriteMealIds = useSelector(getFavoriteIds);

  const favoriteMeal = useMemo(() => {
    return MEALS.filter((meal) => favoriteMealIds.find((id) => id === meal.id));
  }, [MEALS, favoriteMealIds]);

  if (favoriteMeal.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeal} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
