import { NavigateFunction } from "react-router-dom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { User } from "../constants/models/User";
import { setErrorMsg, setSuccessMsg } from "./alertSlice";
import { DASHBOARD } from "../constants/routes";
import isEmpty from "../utils/is-empty";

export interface authState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export const initialState: authState = {
  isAuthenticated: false,
  user: localStorage.getItem("user")
    ? (JSON.parse(localStorage.getItem("user")!) as User)
    : null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
    },
    authComplete(state) {
      state.loading = false;
    },

    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload;
      state.loading = false;
    },

    setLogout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  authComplete,
  authStart,
  setCurrentUser,
  setLoading,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;

// thunks

//load user
export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    const user = await localStorage.getItem("user");
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user) as User));
    }
  } catch (err: any) {
    dispatch(setErrorMsg(err.response.data.error));
  }
};

//login user
export const login =
  (email: string, password: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      if (email === "tonystark@gmail.com" && password === "Jarvis") {
        dispatch(authStart());
        await localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            password: password,
          })
        );
        dispatch(loadUser());

        dispatch(authComplete());
        navigate(DASHBOARD);
        dispatch(setSuccessMsg("Logged in successfully!"));
      } else {
        dispatch(setErrorMsg("Invalid credentials"));
      }
    } catch (err: any) {
      dispatch(setErrorMsg(err.message));
    }
  };

//logout
export const logout = (): AppThunk => async (dispatch) => {
  dispatch(setLogout());
  localStorage.removeItem("user");

  dispatch(setSuccessMsg("Logged out successfully"));
};
