import { combineReducers } from "redux";

import eventReducer from "./events/reducer";

const rootReducer = combineReducers({
  event: eventReducer, 
});

export default rootReducer;