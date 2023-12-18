import {
  createStore,
  Store,
  
} from "redux";
import { persistStore, persistReducer, Persistor  } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose the storage engine (e.g., localStorage)

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root", // Key for the persist storage
  storage, // Storage engine (e.g., localStorage)
  // Optionally, you can whitelist or blacklist specific reducers
  whitelist: ['auth'], // Only 'auth' reducer will be persisted
  // blacklist: ['cart'], // 'cart' reducer will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store< any> =
  createStore(persistedReducer);

const persistor: Persistor = persistStore(store);

export { store, persistor };
