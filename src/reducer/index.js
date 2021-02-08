import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { chatScreenReducer } from "./chatScreenReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chatScreen"],
};

const rootReducer = combineReducers({
  chatScreen: chatScreenReducer,
});

export default persistReducer(persistConfig, rootReducer);

// export default combineReducers({
//   chatScreen: chatScreenReducer,
// });
