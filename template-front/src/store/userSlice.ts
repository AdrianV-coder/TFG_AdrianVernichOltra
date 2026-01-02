import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { getUserByUsername } from "../services/apiService";

export interface AuthUser {
  id: number;
  username: string;
  email?: string;
}

interface UserState {
  user: AuthUser | null;   // solo para “resultado del login”
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<AuthUser, string, { rejectValue: string }>(
  "user/loginUser",
  async (username, { rejectWithValue }) => {
    try {
      const userData = await getUserByUsername(username);

      if (!userData || userData.username !== username) {
        return rejectWithValue("Usuario no encontrado");
      }

      return {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      };
    } catch {
      return rejectWithValue("Error al iniciar sesión");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Error al iniciar sesión";
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
