import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReducerInitialState } from '../../types/reducer-types';
import { UserType } from 'src/types/types';

const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<UserType>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
