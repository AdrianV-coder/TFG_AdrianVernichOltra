import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user.type";

export type AuthUser = Omit<User, "password">;

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

function loadStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("authUser");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;

    // Validación mínima
    if (typeof parsed?.id !== "number" || typeof parsed?.username !== "string") return null;

    return parsed;
  } catch {
    return null;
  }
}

const stored = loadStoredUser();

const initialState: AuthState = {
  isAuthenticated: !!stored,
  user: stored,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
