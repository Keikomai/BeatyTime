import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "../components/_molecules/MealDetails";
import Subtitle from "../components/_molecules/MealDetail/Subtitle";
import List from "../components/_molecules/MealDetail/List";
import { MEALS } from "../../data/dummyData";
import IconButton from "../components/_molecules/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteIds } from "../store/selectors";
import { addFavorite, removeFavorite } from "../store/slices/favoriteMeal";

const MealDetailScreen = ({ route, navigation }) => {
  const selectedMeal = route.params.item;
  const dispatch = useDispatch();

  const favoriteMealIds = useSelector(getFavoriteIds);

  const isFavoriteMeal = useMemo(() => {
    return favoriteMealIds.includes(selectedMeal.id);
  }, [selectedMeal.id, favoriteMealIds]);

  const handleChangeFavoriteStatus = useCallback(() => {
    console.log(isFavoriteMeal);
    if (isFavoriteMeal) {
      dispatch(removeFavorite({ id: selectedMeal.id }));
    } else {
      dispatch(addFavorite({ id: selectedMeal.id }));
    }
  }, [selectedMeal.id, isFavoriteMeal]);

  console.log("meal detail screen");
  const CustomHeaderButton = useCallback(
    ({ onPress }) => {
      return (
        <IconButton
          color={isFavoriteMeal ? "red" : "white"}
          icon="heart"
          onPress={onPress}
        />
      );
    },
    [isFavoriteMeal]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <CustomHeaderButton onPress={handleChangeFavoriteStatus} />;
      },
    });
  }, [navigation, handleChangeFavoriteStatus]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients as string[]} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps as string[]} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
