import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { registerUser } from "../services/apiService";
import { useTranslation } from "react-i18next";
import { UserPlusIcon } from "@heroicons/react/24/outline";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation("auth");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newUser = await registerUser({ username, email, password });
      dispatch(login({ id: newUser.id, username: newUser.username, email: newUser.email }));

      navigate("/", { replace: true });
    } catch {
      setError(t("register.cannotRegister"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-none p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">{t("register.title")}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{t("register.subtitle")}</p>

        {error && (
          <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder={t("register.usernamePlaceholder")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 w-full mb-4
                       focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
            required
          />
          <input
            type="email"
            placeholder={t("register.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 w-full mb-4
                       focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
            required
          />
          <input
            type="password"
            placeholder={t("register.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 w-full mb-6
                       focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400
                       text-white w-full py-3 rounded-md transition duration-300 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            ) : (
              <>
                <UserPlusIcon className="h-5 w-5" />
                {t("register.submit")}
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
          {t("register.haveAccount")}{" "}
          <Link to="/" className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
            {t("register.goLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
