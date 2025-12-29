import { useTranslation } from "react-i18next";
import { SparklesIcon } from "@heroicons/react/24/outline";

export function Header() {
  const { t } = useTranslation("header");

  return (
    <header className="bg-teal-500 py-6 shadow-md">
      <div className="flex flex-col items-center">
        <SparklesIcon className="h-7 w-7 text-white mb-2" />
        <h1 className="text-center text-3xl font-bold text-white">{t("title")}</h1>
        <p className="text-center text-gray-100 text-sm mt-2">{t("subtitle")}</p>
      </div>
    </header>
  );
}
