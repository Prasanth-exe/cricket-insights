import { createSlice } from "@reduxjs/toolkit";
import players from "../data/players";

const initialState = {
  players,
  singlePlayer: null,
  playerA: null,
  playerB: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSinglePlayer: (state, action) => {
      state.singlePlayer = action.payload;
    },
    setPlayerA: (state, action) => {
      state.playerA = action.payload;
      if (state.playerB?.id === state.playerA?.id) state.playerB = null;
    },
    setPlayerB: (state, action) => {
      state.playerB = action.payload;
      if (state.playerA?.id === state.playerB?.id) state.playerA = null;
    },
  },
});

export const { setSinglePlayer, setPlayerA, setPlayerB } = playerSlice.actions;
export default playerSlice.reducer;
