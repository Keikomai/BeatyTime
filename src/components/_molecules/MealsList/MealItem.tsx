import React, { useCallback } from "react";
import styled from "styled-components";
import { Text, View, Image, Pressable, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Meal from "../../../../models/meal";

type MealItemProps = {
  item: Meal;
};

const MealItem = ({ item }: MealItemProps) => {
  const navigation = useNavigation();

  const handleClickItem = useCallback(() => {
    //@ts-ignore
    navigation.navigate("MealDetail", { item: item });
  }, []);

  return (
    <Root>
      <Pressable
        onPress={handleClickItem}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => pressed && { opacity: 0.5 }}
      >
        <Container>
          <CardContainer>
            <SImage source={{ uri: item.imageUrl }} />
            <Title>{item.title}</Title>
          </CardContainer>
          <Details>
            <DetailItem>{item.duration}</DetailItem>
            <DetailItem>{item.complexity.toUpperCase()}</DetailItem>
            <DetailItem>{item.affordability.toUpperCase()}</DetailItem>
          </Details>
        </Container>
      </Pressable>
    </Root>
  );
};

export default MealItem;

const Root = styled(View)`
  border-radius: 8px;
  margin: 16px;
  overflow: ${Platform.OS === "android" ? "hidden" : "visible"};
  background-color: white;
  elevation: 4;
  shadow-color: black;
  shadow-offset: 0px 2px;
  shadow-radius: 8px;
  shadow-opacity: 0.35;
`;

const Container = styled(View)`
  border-radius: 8px;
  overflow: hidden;
`;

const Title = styled(Text)`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;
const SImage = styled(Image)`
  width: 100%;
  height: 200px;
`;
const CardContainer = styled(View)`
  margin-bottom: 20px;
`;

const Details = styled(View)`
  flex-direction: row;
  padding: 8px;
  align-items: center;
  justify-content: center;
`;
const DetailItem = styled(Text)`
  margin-horizontal: 8px;
  font-size: 12px;
`;
