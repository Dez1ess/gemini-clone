import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import themeSlice from "./theme/themeSlice";
import promptSlice from "./prompt/promptSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    prompt: promptSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
