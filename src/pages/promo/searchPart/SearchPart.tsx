import { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const BOT_TOKEN = "8167001322:AAEaRoIXOGM6hAk_Ni1GMGkeMGJKP5nf4BQ";
const CHAT_ID = "-4568335797";

// https://api.telegram.org/bot8167001322:AAEaRoIXOGM6hAk_Ni1GMGkeMGJKP5nf4BQ/getUpdates
// https://api.telegram.org/bot[your_token]/sendMessage?chat_id=[your chat_id]

const SearchPart = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);

    const telegramMessage = `Yangi obunachi email: ${email}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
        }),
      });
      console.log("Message sent to Telegram");
    } catch (error) {
      console.error("Failed to send message to Telegram:", error);
    }

    setEmail("");
  };

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Узнавайте первыми о распродажах и новинках!
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border-b-2 border-purple-600 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-800 sm:max-w-xs"
            placeholder="Электронная почта"
          />
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-none text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto"
            >
              ПОДПИСАТЬСЯ
            </button>
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
