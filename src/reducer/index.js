import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import { chatScreenReducer } from "./chatScreenReducer";
import { rabReducer } from "./tabReducer";
import { currencyReducer } from "./currencyReducer";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["chatScreen"],
};

const rootReducer = combineReducers({
  chatScreen: chatScreenReducer,
  tab: rabReducer,
  currency: currencyReducer,
});

export default persistReducer(persistConfig, rootReducer);
