import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout as authLogout } from "../store/authSlice";
import { clearUserState } from "../store/userSlice";
import type { AppDispatch } from "../store";
import { useTranslation } from "react-i18next";
import { PlusIcon, ChartBarIcon, UserIcon, ArrowRightOnRectangleIcon, SunIcon, MoonIcon, HomeIcon } from "@heroicons/react/24/outline";

export function NavbarDefault() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["navbar", "common"]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("data-theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
   
      localStorage.setItem("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
   
      localStorage.setItem("data-theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(clearUserState());
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/home" className="text-xl font-bold hover:text-teal-400 transition flex items-center gap-2">
        <HomeIcon className="h-6 w-6" />
        {t("appName", { ns: "common" })}
      </Link>

      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => void i18n.changeLanguage("es")}
            className={`px-3 py-1 rounded ${
              i18n.language === "es" ? "bg-teal-600 text-white" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            ES
          </button>
          <button
            onClick={() => void i18n.changeLanguage("en")}
            className={`px-3 py-1 rounded ${
              i18n.language === "en" ? "bg-teal-600 text-white" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            EN
          </button>
        </div>

        <Link
          to="/create-habit"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <PlusIcon className="h-5 w-5" />
          {t("createHabit")}
        </Link>

        <Link
          to="/statistics"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <ChartBarIcon className="h-5 w-5" />
          {t("statistics")}
        </Link>

        <Link
          to="/account"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <UserIcon className="h-5 w-5" />
          {t("account")}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
          title={isDarkMode ? t("themeDay") : t("themeNight")}
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          {isDarkMode ? t("themeDay") : t("themeNight")}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          {t("logout")}
        </button>
      </div>
    </nav>
  );
}
