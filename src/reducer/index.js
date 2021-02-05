import { combineReducers } from "redux";

import { chatScreenReducer } from "./chatScreenReducer";

export default combineReducers({
  chatScreen: chatScreenReducer,
});
