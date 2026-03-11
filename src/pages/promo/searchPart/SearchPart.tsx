import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const SearchPart = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return;

    setStatus("sending");

    try {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      const text = `📩 New subscription:\n${email}`;

      const res = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        }
      );

      if (!res.ok) throw new Error("Telegram API error");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t("searchpart.subscribe")}
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border-b-2 border-purple-600 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-800 sm:max-w-xs"
            placeholder={t("searchpart.email")}
          />
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <motion.button
              type="submit"
              disabled={status === "sending"}
              className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-none text-white sm:w-auto ${
                status === "sending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-600"
                  : status === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-purple-600 hover:bg-purple-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              {status === "sending"
                ? t("searchpart.sending")
                : status === "success"
                ? t("searchpart.success")
                : status === "error"
                ? t("searchpart.error")
                : t("searchpart.button")}
            </motion.button>
          </div>
        </form>
        <div className="mt-8 flex justify-center -ml-5 space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <FaFacebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <FaInstagram className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchPart;
