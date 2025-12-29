import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Header } from "../components/Header";
import { NavbarDefault } from "../components/NavbarDefault";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChartBarIcon } from "@heroicons/react/24/outline";

function AccountPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation(["account", "common"]);

  if (!user) {
    return <p className="text-center mt-10 text-red-500">{t("notLoggedIn")}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="flex flex-col flex-1">
        <NavbarDefault />

        <div className="p-6 max-w-3xl w-full mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-teal-600 mb-2">
              {t("title", { username: user.username })}
            </h2>

            <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
              <p>
                <span className="font-semibold">{t("username")}:</span> {user.username}
              </p>

              {user.email && (
                <p>
                  <span className="font-semibold">{t("email")}:</span> {user.email}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/statistics"
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300 text-white"
              >
                <ChartBarIcon className="h-5 w-5" />
                {t("goStats")}
              </Link>
            </div>

            {/* PREMIUM (si luego lo implementas en backend)
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
              >
                Hacerme Premium (10€/mes)
              </button>
            </div>
            */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AccountPage;
