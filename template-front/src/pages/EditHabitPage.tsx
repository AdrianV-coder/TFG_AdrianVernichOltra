import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { NavbarDefault } from "../components/NavbarDefault";
import { getHabitById, updateHabit } from "../services/apiService";
import { PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function EditHabitPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const habitId = Number(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!Number.isFinite(habitId)) {
        setError("ID de hábito inválido.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const habit = await getHabitById(habitId);
        setName(habit.name);
        setDescription(habit.description);
      } catch {
        setError("No se pudo cargar el hábito.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [habitId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError(null);

    try {
      await updateHabit(habitId, { name, description });
      navigate("/home", { replace: true });
    } catch {
      setError("No se pudo guardar el hábito.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="flex flex-col flex-1">
        <NavbarDefault />

        <div className="p-6 max-w-xl w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              Editar hábito
            </h2>

            <Link
              to="/home"
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded transition
                         dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Volver
            </Link>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500"></div>
            </div>
          ) : (
            <form
              onSubmit={handleSave}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-none p-6 border border-gray-100 dark:border-gray-700"
            >
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Nombre
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 dark:border-gray-700 rounded-md p-3 w-full mb-4
                           focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
              />

              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-200 dark:border-gray-700 rounded-md p-3 w-full mb-6
                           focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                rows={4}
                required
              />

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400
                           text-white w-full py-3 rounded-md transition disabled:opacity-60"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                ) : (
                  <>
                    <PencilSquareIcon className="h-5 w-5" />
                    Guardar cambios
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
