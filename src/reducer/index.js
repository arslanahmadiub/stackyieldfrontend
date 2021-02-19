import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { chatScreenReducer } from "./chatScreenReducer";
import { rabReducer } from "./tabReducer";
import { currencyReducer } from "./currencyReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chatScreen"],
};

// export default combineReducers({
//   chatScreen: chatScreenReducer,
//   tab: rabReducer,
//   currency: currencyReducer,
// });

const rootReducer = combineReducers({
  chatScreen: chatScreenReducer,
  tab: rabReducer,
  currency: currencyReducer,
});

// export default persistReducer(rootReducer);
export default persistReducer(persistConfig, rootReducer);

// export default combineReducers({
//   chatScreen: chatScreenReducer,
// });
