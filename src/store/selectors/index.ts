import { RootState } from "..";

export const getFavoriteIds = (state: RootState) => state.root.favoriteMeal.ids;
