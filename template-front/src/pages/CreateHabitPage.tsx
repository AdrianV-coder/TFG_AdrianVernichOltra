import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Header } from "../components/Header";
import { NavbarDefault } from "../components/NavbarDefault";
import { createHabit } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function CreateHabitPage() {
  const navigate = useNavigate();
  const authUser = useSelector((s: RootState) => s.auth.user);

  const { t } = useTranslation("createHabit");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return;

    setLoading(true);
    setError(null);

    try {
      await createHabit(authUser.id, { name, description });
      navigate("/home", { replace: true });
    } catch {
      setError(t("errorCreate"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="flex flex-col flex-1">
        <NavbarDefault />

        <div className="p-6 max-w-xl w-full mx-auto">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">{t("title")}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t("subtitle")}</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <label className="block text-sm font-medium mb-2">{t("fields.nameLabel")}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              placeholder={t("fields.namePlaceholder")}
              required
            />

            <label className="block text-sm font-medium mb-2">{t("fields.descriptionLabel")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              placeholder={t("fields.descriptionPlaceholder")}
              rows={4}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-teal-500 text-white w-full py-3 rounded-md hover:bg-teal-600 transition disabled:opacity-60"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5" />
                  {t("save")}
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
