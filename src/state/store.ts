import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme/themeSlice";
import promptSlice from "./prompt/promptSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    prompt: promptSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
