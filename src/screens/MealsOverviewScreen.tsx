import { View, Text, StyleSheet, FlatList } from "react-native";
import { CATEGORIES, MEALS } from "../../data/dummyData";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import Meal from "../../models/meal";
import MealItem from "../components/_molecules/MealsList/MealItem";

function MealsOverviewScreen({ navigation, route }) {
  const categoryId = route.params.categoryId;

  const displayMeals = useMemo(
    () => MEALS.filter((item) => item.categoryIds.includes(categoryId)) || [],
    [categoryId]
  );

  function renderMealItem(itemData: Meal) {
    /* const pressHandler = (id: any) => {
      const meal = displayMeals.find((item) => item.id === id);
      navigation.navigate("MealDetail", { item: meal });
    }; */

    return <MealItem item={itemData} /* onPress={pressHandler} */ />;
  }

  console.log("meal overciew screen");
  useLayoutEffect(() => {
    const categoryTitle =
      CATEGORIES.find((item) => item.id === categoryId)?.title || "";

    navigation.setOptions({ title: categoryTitle });
  }, [categoryId, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={displayMeals}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderMealItem(item.item)}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
