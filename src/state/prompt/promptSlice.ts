import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getAPIResponse from "../../config/gemini";

export interface RecentPromptInterface {
  id: number;
  title: string;
  description: string;
}

interface PromptInterface {
  input: string;
  recentPrompts: RecentPromptInterface[];
  loading: boolean;
  resultData: string;
  showResult: boolean;
  activeId: number | null;
}

const promptState: PromptInterface = {
  input: "",
  recentPrompts: [],
  loading: false,
  resultData: "",
  showResult: false,
  activeId: null,
};

//ASYNC ACTIONS
export const getPromptData = createAsyncThunk(
  "prompt/getPromptData",
  async (_, thunkAPI) => {
    const currentState = thunkAPI.getState() as { prompt: PromptInterface };
    const { input } = currentState.prompt;
    thunkAPI.dispatch(
      updateRecentPrompts({ id: Date.now(), title: input, description: "" })
    );

    return getAPIResponse(input);
  }
);

const promptSlice = createSlice({
  name: "prompt",
  initialState: promptState,
  reducers: {
    updateInput: (state, action: { payload: { input: string } }) => {
      state.input = action.payload.input;
    },
    updateActiveRecentPrompt: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.activeId = action.payload.id;
    },
    updateRecentPrompts: (
      state,
      action: PayloadAction<RecentPromptInterface>
    ) => {
      const existingPrompt = state.recentPrompts.find(
        (prompt) => prompt.id === action.payload.id
      );
      if (existingPrompt) {
        existingPrompt.title = action.payload.title;
        existingPrompt.description = action.payload.description;
      } else {
        state.recentPrompts.push(action.payload);
        state.activeId = action.payload.id;
      }
    },
    getRecentPrompt: (state, action: { payload: { id: number } }) => {
      const recentPrompt = state.recentPrompts.find(
        (prompt) => prompt.id === action.payload.id
      );
      if (recentPrompt) {
        state.input = recentPrompt.title;
        state.resultData = recentPrompt.description;
      }
    },
    approveShowResult: (state) => {
      state.showResult = true;
    },
    cancelShowResult: (state) => {
      state.showResult = false;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromptData.pending, (state) => {
        state.resultData = "";
        state.showResult = true;
        state.loading = true;
      })
      .addCase(getPromptData.fulfilled, (state, action) => {
        state.resultData = action.payload;
        state.recentPrompts[state.recentPrompts.length - 1].description =
          action.payload;
        state.loading = false;
      })
      .addCase(getPromptData.rejected, (state) => {
        state.loading = false;
        state.showResult = false;
      });
  },
});

export const {
  updateInput,
  updateRecentPrompts,
  getRecentPrompt,
  cancelShowResult,
  approveShowResult,
  updateLoading,
  updateActiveRecentPrompt,
} = promptSlice.actions;
export default promptSlice.reducer;
