import { createSlice } from "@reduxjs/toolkit";
// FOR MOBILE VERSION
interface ILayout {
  isMenuOpen: boolean;
}
const initialState: ILayout = {
    isMenuOpen: true
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action) => {
      // action.payload = boolean
      state.isMenuOpen = action.payload;
    },

  },
});

export const { setIsMenuOpen } =
layoutSlice.actions;
export default layoutSlice.reducer;
