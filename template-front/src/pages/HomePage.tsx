import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Header } from "../components/Header";
import { NavbarDefault } from "../components/NavbarDefault";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Habit } from "../types/habit.type";
import type { HabitLog } from "../types/habitLog.type";
import { deleteHabit, getHabitsByUserId, getHabitLogsByRange, markHabit } from "../services/apiService";
import { CheckIcon, XMarkIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

function toIsoDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function HomePage() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation(["home"]);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageError, setPageError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [todayStatus, setTodayStatus] = useState<Record<number, boolean | undefined>>({});
  const [busyHabitId, setBusyHabitId] = useState<number | null>(null);

  const today = useMemo(() => toIsoDate(new Date()), []);

  useEffect(() => {
    const load = async () => {
      if (!authUser) {
        setPageError(t("errors.noAuthUser"));
        setLoading(false);
        return;
      }

      setLoading(true);
      setPageError(null);
      setActionError(null);

      try {
        const data = await getHabitsByUserId(authUser.id);
        setHabits(data);

        const results = await Promise.all(
          data.map(async (h) => {
            const logs: HabitLog[] = await getHabitLogsByRange(h.id, today, today);
            const last = logs.at(-1);
            return [h.id, last?.completed] as const;
          })
        );

        const statusMap: Record<number, boolean | undefined> = {};
        for (const [habitId, completed] of results) statusMap[habitId] = completed;
        setTodayStatus(statusMap);
      } catch {
        setPageError(t("errors.loadingHabits"));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authUser, today, t]);

  const handleMarkToday = async (habitId: number, completed: boolean) => {
    setActionError(null);

    try {
      setBusyHabitId(habitId);
      await markHabit(habitId, today, completed);
      setTodayStatus((prev) => ({ ...prev, [habitId]: completed }));
    } catch {
      setActionError(t("errors.updatingToday"));
    } finally {
      setBusyHabitId(null);
    }
  };

  const handleDeleteHabit = async (habitId: number) => {
    setActionError(null);

    try {
      setBusyHabitId(habitId);
      await deleteHabit(habitId);

      setHabits((prev) => prev.filter((h) => h.id !== habitId));
      setTodayStatus((prev) => {
        const copy = { ...prev };
        delete copy[habitId];
        return copy;
      });
    } catch {
      setActionError(t("errors.deletingHabit"));
    } finally {
      setBusyHabitId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="flex flex-col flex-1">
        <NavbarDefault />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-teal-600">{t("title")}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t("subtitle", { date: today })}</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500"></div>
            </div>
          )}

          {pageError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {pageError}
            </div>
          )}

          {actionError && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200">
              {actionError}
            </div>
          )}

          {!loading && !pageError && habits.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-300">{t("empty")}</div>
          )}

          {!loading && !pageError && habits.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => {
                const status = todayStatus[habit.id];
                const isBusy = busyHabitId === habit.id;

                return (
                  <div
                    key={habit.id}
                    className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{habit.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{habit.description}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMarkToday(habit.id, true)}
                        disabled={isBusy}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded transition disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        <CheckIcon className="h-5 w-5" />
                        {t("actions.done")}
                      </button>

                      <button
                        onClick={() => handleMarkToday(habit.id, false)}
                        disabled={isBusy}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-2 rounded transition disabled:opacity-60 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 flex items-center justify-center gap-2"
                      >
                        <XMarkIcon className="h-5 w-5" />
                        {t("actions.notDone")}
                      </button>
                    </div>

                    <div className="mt-3 text-sm">
                      {status === true && <span className="text-teal-600 font-medium">{t("status.done")}</span>}
                      {status === false && (
                        <span className="text-gray-600 dark:text-gray-300 font-medium">{t("status.notDone")}</span>
                      )}
                      {status === undefined && (
                        <span className="text-gray-500 dark:text-gray-400">{t("status.unset")}</span>
                      )}
                    </div>

                    <Link
                      to={`/habits/${habit.id}/edit`}
                      className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded transition flex items-center justify-center gap-2"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      {t("actions.edit")}
                    </Link>

                    <button
                      onClick={() => handleDeleteHabit(habit.id)}
                      disabled={isBusy}
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                      {t("actions.delete")}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
