import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//define object structure for the state
interface IUserState {
  user: any;
  isAuthenticated: boolean;
}
//define the initial state object
//now defined in redux as state.user and state.authenticated (see redux dev tools).
const initialState: IUserState = {
  user: null,
  isAuthenticated: false
};

//define our options -  the slice name and our reducers.
export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated } = userSlice.actions;
