import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Habit } from "../types/habit.type";
import type { HabitLog } from "../types/habitLog.type";
import { getHabitsByUserId, getHabitLogsByRange } from "../services/apiService";

function toIsoDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);

  return copy;
}

function countUniqueCompletedDays(logs: HabitLog[]) {
  const map = new Map<string, boolean>();

  for (const l of logs) {
    const prev = map.get(l.date);
    if (prev === true) continue;
    map.set(l.date, l.completed);
  }

  let count = 0;
  for (const completed of map.values()) if (completed) count++;

  return count;
}

function StatisticsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation(["statistics", "common"]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [counts, setCounts] = useState<Record<number, number>>({});

  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  if (typeof HighchartsAccessibility === 'function') {
    HighchartsAccessibility(Highcharts);
  }

  useEffect(() => {
    const syncTheme = () => setIsDark(localStorage.getItem("data-theme") === "dark");
    syncTheme();

    window.addEventListener("habitlife:themechange", syncTheme);
    
    return () => window.removeEventListener("habitlife:themechange", syncTheme);
  }, []);

  // Últimos 7 días
  const end = useMemo(() => new Date(), []);
  const start = useMemo(() => addDays(new Date(), -6), []);
  const startIso = useMemo(() => toIsoDate(start), [start]);
  const endIso = useMemo(() => toIsoDate(end), [end]);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setError(t("errorLoadingStats"));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const userHabits = await getHabitsByUserId(user.id);
        setHabits(userHabits);

        const results = await Promise.all(
          userHabits.map(async (h) => {
            const logs: HabitLog[] = await getHabitLogsByRange(h.id, startIso, endIso);
            const completedCount = countUniqueCompletedDays(logs);
            return [h.id, completedCount] as const;
          })
        );

        const map: Record<number, number> = {};
        for (const [habitId, completedCount] of results) map[habitId] = completedCount;
        setCounts(map);
      } catch (e: any) {
        setError(e?.message ?? t("errorLoadingStats"));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, startIso, endIso, t]);

  const categories = habits.map((h) => h.name);
  const data = habits.map((h) => counts[h.id] ?? 0);
  const yMax = Math.max(1, ...data);

  const chartOptions: Highcharts.Options = useMemo(() => {
    const textColor = isDark ? "#E5E7EB" : "#111827";
    const subTextColor = isDark ? "#CBD5E1" : "#6B7280";
    const gridColor = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
    const bgColor = isDark ? "#111827" : "#FFFFFF";
    const tooltipBg = isDark ? "#0B1220" : "#FFFFFF";
    const tooltipBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";

    return {
      chart: {
        type: "column",
        backgroundColor: bgColor,
      },
      title: {
        text: t("chartTitle"),
        style: { color: textColor },
      },
      subtitle: {
        text: t("chartSubtitle", { start: startIso, end: endIso }),
        style: { color: subTextColor },
      },
      xAxis: {
        categories,
        title: { text: undefined },
        lineColor: gridColor,
        tickColor: gridColor,
        labels: { style: { fontSize: "12px", color: subTextColor } },
      },
      yAxis: {
        min: 0,
        max: yMax,
        title: { text: t("yTitle"), style: { color: subTextColor } },
        allowDecimals: false,
        gridLineColor: gridColor,
        labels: { style: { color: subTextColor } },
      },
      tooltip: {
        backgroundColor: tooltipBg,
        borderColor: tooltipBorder,
        style: { color: textColor },
        pointFormat: `<b>{point.y}</b> ${t("tooltipSuffix")}`,
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          colorByPoint: true,
        },
      },
      series: [
        {
          name: t("seriesName"),
          type: "column",
          data,
        },
      ],
      credits: { enabled: false },
      legend: { enabled: false },
      accessibility: {
        enabled: true,
        description: t("chartDescription"),
      },
    };
  }, [isDark, t, categories, data, yMax, startIso, endIso]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="p-6">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-md dark:bg-gray-900">
          <h2 className="text-xl font-bold">{t("title")}</h2>

          <Link
            to="/home"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            {t("back", { ns: "common" })}
          </Link>
        </nav>

        <section className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-none">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">{t("panelTitle")}</h2>
          <p className="text-gray-500 mb-4 dark:text-gray-300">{t("panelSubtitle")}</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-gray-600 dark:text-gray-300">{t("loadingStats")}</div>
          ) : habits.length === 0 ? (
            <div className="text-gray-600 dark:text-gray-300">{t("noHabits")}</div>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
        </section>
      </main>
    </div>
  );
}

export default StatisticsPage;
