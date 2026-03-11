import { useTranslation } from "react-i18next";

const BeautyClub = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-center font-semibold text-4xl mb-7 mt-9">
        {t("beautyclub.title")}
      </h2>
      <div className="flex justify-center items-center py-12 px-6 bg-white">
        <div className="max-w-md mr-64">
          <h1 className="text-2xl font-semibold mb-6">
            {t("beautyclub.birthdayTitle")}
          </h1>
          <p className="text-sm mb-4">
            {t("beautyclub.birthdayDesc")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouGet")}</p>
          <p className="text-sm mb-4">
            {t("beautyclub.birthdayGet")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouNeed")}</p>
          <p className="text-sm">
            {t("beautyclub.birthdayNeed")}
          </p>
          <p className="mt-4 text-blue-600 font-semibold cursor-pointer">
            {t("beautyclub.popularQuestions")}
          </p>
        </div>
        <div className="max-w-md -mt-16">
          <img
            src="/images/1.png"
            alt="Beauty illustration"
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="flex justify-center mt-10 items-center py-12 px-6 bg-white">
        <div className="max-w-md -mt-16">
          <img
            src="/images/2.png"
            alt="Beauty illustration"
            className="w-full object-cover"
          />
        </div>
        <div className="max-w-md ml-64">
          <h1 className="text-2xl font-semibold mb-6">
            {t("beautyclub.trendTitle")}
          </h1>
          <p className="text-sm mb-4">
            {t("beautyclub.trendDesc")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouGet")}</p>
          <p className="text-sm mb-4">
            {t("beautyclub.trendGet")}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-10 items-center py-12 px-6 bg-white">
        <div className="max-w-md mr-64">
          <h1 className="text-2xl font-semibold mb-6">{t("beautyclub.newYearTitle")}</h1>
          <p className="text-sm mb-4">
            {t("beautyclub.newYearDesc")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouGet")}</p>
          <p className="text-sm mb-4">
            {t("beautyclub.newYearGet")}
          </p>
        </div>
        <div className="max-w-md -mt-16">
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouNeed")}</p>
          <p className="text-sm">
            {t("beautyclub.newYearNeed")}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-10 items-center py-12 px-6 bg-white">
        <div className="max-w-md">
          <img
            src="/images/3.png"
            alt="Beauty illustration"
            className="w-full object-cover"
          />
        </div>
        <div className="max-w-md ml-64">
          <h1 className="text-2xl font-semibold mb-6">
            {t("beautyclub.brandsTitle")}
          </h1>
          <p className="text-sm mb-4">
            {t("beautyclub.brandsDesc")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouGet")}</p>
          <p className="text-sm mb-4">
            {t("beautyclub.brandsGet")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouNeed")}</p>
          <p className="text-sm mb-4">
            {t("beautyclub.brandsNeed")}
          </p>
          <p className="text-sm mb-4">
            {t("beautyclub.brandsEmailNote")}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center py-12 px-6 bg-white">
        <div className="max-w-md mr-64">
          <h1 className="text-2xl font-semibold mb-6">{t("beautyclub.wishlistTitle")}</h1>
          <p className="text-sm mb-4">
            {t("beautyclub.wishlistDesc")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouGet")}</p>
          <p className="text-sm mb-4">
            {t("beautyclub.wishlistGet")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouNeed")}</p>
          <p className="text-sm">
            {t("beautyclub.wishlistNeed")}
          </p>
        </div>
        <div className="max-w-md">
          <img
            src="/images/4.png"
            alt="Beauty illustration"
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="flex justify-center mt-10 items-center py-12 px-6 bg-white">
        <div className="max-w-md mr-64">
          <h1 className="text-2xl font-semibold mb-6">{t("beautyclub.historyTitle")}</h1>
          <p className="text-sm mb-4">
            {t("beautyclub.historyDesc")}
          </p>
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouGet")}</p>
          <p className="text-sm mb-4">
            {t("beautyclub.historyGet")}
          </p>
        </div>
        <div className="max-w-md -mt-40">
          <p className="text-lg font-semibold mb-2">{t("beautyclub.whatYouNeed")}</p>
          <p className="text-sm">
            {t("beautyclub.historyNeed")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeautyClub;
