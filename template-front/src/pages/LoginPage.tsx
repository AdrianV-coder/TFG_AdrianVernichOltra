import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/userSlice";
import { login as authLogin } from "../store/authSlice";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.auth.user);
  const { loading, error } = useAppSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation("auth");

  useEffect(() => {
    if (authUser) navigate("/home");
  }, [authUser, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authenticatedUser = await dispatch(loginUser(username)).unwrap();
      dispatch(authLogin(authenticatedUser));
      navigate("/home", { replace: true });
    } catch {
      alert(t("login.cannotLogin"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-none p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
          {t("login.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{t("login.subtitle")}</p>

        {error && (
          <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder={t("login.usernamePlaceholder")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 w-full mb-4
                       focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
            required
          />

          <input
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 w-full mb-6
                       focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                <ArrowRightIcon className="h-5 w-5" />
                {t("login.submit")}
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
          {t("login.noAccount")}{" "}
          <Link to="/register" className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
            {t("login.register")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
