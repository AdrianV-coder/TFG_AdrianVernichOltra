import axios, { AxiosError } from "axios";
import type { User } from "../types/user.type";
import type { Habit } from "../types/habit.type";
import type { HabitLog } from "../types/habitLog.type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Helper para normalizar errores
 */
function getErrorMessage(error: unknown, fallback = "Error de red o del servidor") {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<any>;
    return err.response?.data?.message ?? err.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

/**
 * Helper para obtener data directamente
 */
async function unwrap<T>(promise: Promise<{ data: T }>): Promise<T> {
  const { data } = await promise;
  return data;
}

// --------------------
// Users
// --------------------

export const registerUser = async (user: Omit<User, "id">): Promise<User> => {
  try {
    return await unwrap(api.post<User>("/users", user));
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudo registrar el usuario"));
  }
};

export const getUserByUsername = async (username: string): Promise<User> => {
  try {
    return await unwrap(api.get<User>("/users/by-username", { params: { username } }));
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudo obtener el usuario"));
  }
};

// --------------------
// Habits
// --------------------

export const getHabitsByUserId = async (userId: number): Promise<Habit[]> => {
  try {
    return await unwrap(api.get<Habit[]>(`/habits/user/${userId}`));
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudieron cargar los hábitos"));
  }
};

export const getHabitById = async (habitId: number): Promise<Habit> => {
  try {
    return await unwrap(api.get<Habit>(`/habits/${habitId}`));
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudo cargar el hábito"));
  }
};

export const createHabit = async (
  userId: number,
  habit: Omit<Habit, "id" | "userId" | "createdAt" | "version">
): Promise<Habit> => {
  try {
    return await unwrap(api.post<Habit>("/habits", habit, { params: { userId } }));
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudo crear el hábito"));
  }
};

export const updateHabit = async (
  habitId: number,
  habit: Omit<Habit, "id" | "userId" | "createdAt" | "version">
): Promise<Habit> => {
  try {
    return await unwrap(api.put<Habit>(`/habits/${habitId}`, habit));
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudo actualizar el hábito"));
  }
};

export const deleteHabit = async (habitId: number): Promise<void> => {
  try {
    await api.delete(`/habits/${habitId}`);
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudo eliminar el hábito"));
  }
};

// --------------------
// Habit Logs
// --------------------

export const markHabit = async (habitId: number, date: string, completed: boolean): Promise<HabitLog> => {
  try {
    return await unwrap(
      api.post<HabitLog>("/habit-logs", null, {
        params: { habitId, date, completed },
      })
    );
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudo marcar el hábito"));
  }
};

export const getHabitLogsByHabit = async (habitId: number): Promise<HabitLog[]> => {
  try {
    return await unwrap(api.get<HabitLog[]>(`/habit-logs/habit/${habitId}`));
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudieron cargar los registros del hábito"));
  }
};

export const getHabitLogsByRange = async (habitId: number, start: string, end: string): Promise<HabitLog[]> => {
  try {
    return await unwrap(
      api.get<HabitLog[]>(`/habit-logs/habit/${habitId}/range`, {
        params: { start, end },
      })
    );
  } catch (e) {
    throw new Error(getErrorMessage(e, "No se pudieron cargar los registros en el rango"));
  }
};
