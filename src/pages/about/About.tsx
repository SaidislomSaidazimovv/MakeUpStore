import { useTranslation } from "react-i18next";
import PageTransition from "../../components/PageTransition";

const About = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
    <div className="flex flex-col items-center py-10 px-5 lg:px-32">
      <h1 className="text-3xl font-bold text-center mb-6 animate-fade-in">
        {t("about.title")}
      </h1>

      <div className="lg:flex lg:justify-between w-full">
        <div className="lg:w-2/3 mb-10 lg:mb-0 mr-24 space-y-6">
          <p className="text-base leading-relaxed transition-all duration-300">
            {t("about.welcome")}
          </p>
          <p className="text-base leading-relaxed transition-all duration-300">
            {t("about.noLimits")}
          </p>
          <p className="text-base leading-relaxed transition-all duration-300">
            {t("about.goal")}
          </p>
          <p className="text-base font-semibold leading-relaxed text-black transition-all duration-300">
            {t("about.powerhouse")}
          </p>
        </div>

        <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-xl font-bold mb-4">{t("about.contactsTitle")}</h3>
          <p className="text-gray-700 mb-2">{t("about.alwaysInTouch")}</p>
          <p className="text-purple-600 underline mb-4 cursor-pointer hover:text-purple-600 transition-all duration-300">
            {t("about.writeUs")}
          </p>
          <p className="text-gray-700">+998 712 050 578</p>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.wideRange")}
        </h2>
        <p className="text-base w-[1230px] leading-relaxed transition-all duration-300">
          {t("about.wideRangeDesc")}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.partnership")}
        </h2>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.partnershipDesc")}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.comfort")}
        </h2>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.comfortDesc1")}
        </p>
        <p className="text-base leading-relaxed transition-all duration-300">
          {t("about.comfortDesc2")}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.showrooms")}
        </h2>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.showroomsDesc1")}
        </p>
        <p className="text-base leading-relaxed transition-all duration-300">
          {t("about.showroomsDesc2")}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.atelier")}
        </h2>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.atelierDesc")}
        </p>
        <p className="text-base leading-relaxed transition-all duration-300">
          {t("about.atelierHours")}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.trends")}
        </h2>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.trendsDesc")}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.future")}
        </h2>
        <p className="text-base leading-relaxed transition-all duration-300">
          {t("about.futureDesc1")}
        </p>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.futureDesc2")}
        </p>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.futureDesc3")}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-black transition-all duration-300">
          {t("about.inspiration")}
        </h2>
        <p className="text-base leading-relaxed transition-all duration-300">
          {t("about.inspirationDesc1")}
        </p>
        <p className="text-base leading-relaxed w-[1230px] transition-all duration-300">
          {t("about.inspirationDesc2")}
        </p>
        <p className="text-base leading-relaxed transition-all duration-300">
          {t("about.joinUs")}
        </p>
      </div>
    </div>
    </PageTransition>
  );
};

export default About;
