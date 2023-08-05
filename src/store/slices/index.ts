import { combineReducers } from "redux";
import favoriteMeal from "./favoriteMeal";

const rootReducer = combineReducers({
  favoriteMeal: favoriteMeal,
});

export default rootReducer;
