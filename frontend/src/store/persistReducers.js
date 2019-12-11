import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: "gympoint2",
      storage,
      whitelist: ["Reducers"]
    },
    reducers
  );

  return persistedReducer;
};
