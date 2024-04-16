import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assets } from "../../assets/assets";

interface UserState {
  email: string;
  name: string;
  logo: string;
}

const initialState: UserState = {
  email: "",
  name: "Dev",
  logo: assets.user_icon,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.logo = action.payload.logo;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
