import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "auth", // Persist only the "auth" slice
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid issues with non-serializable values in redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
