import { createSlice, PayloadAction as Action } from "@reduxjs/toolkit";
import { Meal } from "../../src/types/Meal";

const initialState = {
  ids: [],
};

export const favoriteMeal = createSlice({
  name: "favoriteMeal",
  initialState,
  reducers: {
    addFavorite: (state, action: Action<{ id: number }>) => ({
      ...state,
      ids: [...state.ids, action.payload.id],
    }),

    removeFavorite: (state, action: Action<{ id: number }>) => ({
      ...state,
      ids: state.ids.filter((id) => id !== action.payload.id),
    }),
  },
});

export const { addFavorite, removeFavorite } = favoriteMeal.actions;

export default favoriteMeal.reducer;
