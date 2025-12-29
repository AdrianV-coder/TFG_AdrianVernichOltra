export type Habit = {
  id: number;
  userId: number;
  name: string;
  description: string;
  createdAt: string; // LocalDate en backend -> string en frontend
  version?: number;
};
