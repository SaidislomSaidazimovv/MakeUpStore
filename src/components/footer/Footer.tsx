import austria from "../../assets/austria.svg";
import belgium from "../../assets/belgium.svg";
import bulgarian from "../../assets/bulgarian.svg";
import croatia from "../../assets/croatia.svg";
import czechRepublic from "../../assets/czechrepublic.svg";
import cyprus from "../../assets/cyprus.png";
import denmark from "../../assets/denmark.png";
import estonia from "../../assets/estonia.svg";
import france from "../../assets/france.svg";
import germany from "../../assets/germany.svg";
import greece from "../../assets/greece.png";
import hungary from "../../assets/hungary.svg";
import ireland from "../../assets/ireland.png";
import israel from "../../assets/israel.svg";
import italy from "../../assets/italy.svg";
import japan from "../../assets/japan.svg";
import russia from "../../assets/russia.svg";
import southKorea from "../../assets/southkorea.svg";
import usa from "../../assets/usa.svg";
import { Link } from "react-router-dom";
import SearchPart from "../../pages/promo/searchPart/SearchPart";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-6 text-sm">
      <SearchPart />
      <div className="container mt-16 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">О нас</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-900">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-gray-900">
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-900">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-gray-900">
                  Приложение
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">О доставке</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/delivery" className="hover:text-gray-900">
                  О доставке
                </Link>
              </li>
              <li>
                <Link to="/payment" className="hover:text-gray-900">
                  Способы оплаты
                </Link>
              </li>
              <li>
                <Link to="/authenticity" className="hover:text-gray-900">
                  Оригинальность продукции
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-gray-900">
                  Обмен и возврат
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Статьи</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/articles" className="hover:text-gray-900">
                  Статьи
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-gray-900">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/beauty-club" className="hover:text-gray-900">
                  Beauty Club
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">+998 712 050 578</h3>
            <p>
              Вы можете
              <Link
                to="/contact"
                className="text-purple-600 hover:text-purple-800"
              >
                написать нам письмо
              </Link>
              позвонить нам по телефонам
            </p>
            <p className="mt-2">Ежедневно с 7:55 до 20:05</p>
            <Link
              to="/callback"
              className="text-purple-600 hover:text-purple-800 block mt-2"
            >
              Обратный звонок
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <p className="font-semibold ml-64">MAKEUP GLOBAL</p>
              <div className="flex flex-wrap ml-64 gap-2 mt-2">
                <img src={austria} alt="Austria" className="h-6 w-auto" />
                <img src={belgium} alt="Belgium" className="h-6 w-auto" />
                <img src={bulgarian} alt="Bulgaria" className="h-6 w-auto" />
                <img src={croatia} alt="Croatia" className="h-6 w-auto" />
                <img
                  src={czechRepublic}
                  alt="Czech Republic"
                  className="h-6 w-auto"
                />
                <img src={cyprus} alt="Cyprus" className="h-6 w-auto" />
                <img src={denmark} alt="Denmark" className="h-6 w-auto" />
                <img src={estonia} alt="Estonia" className="h-6 w-auto" />
                <img src={france} alt="France" className="h-6 w-auto" />
                <img src={germany} alt="Germany" className="h-6 w-auto" />
                <img src={greece} alt="Greece" className="h-6 w-auto" />
                <img src={hungary} alt="Hungary" className="h-6 w-auto" />
                <img src={ireland} alt="Ireland" className="h-6 w-auto" />
                <img src={israel} alt="Israel" className="h-6 w-auto" />
                <img src={italy} alt="Italy" className="h-6 w-auto" />
                <img src={japan} alt="Japan" className="h-6 w-auto" />
                <img src={russia} alt="Russia" className="h-6 w-auto" />
                <img
                  src={southKorea}
                  alt="South Korea"
                  className="h-6 w-auto"
                />
                <img src={usa} alt="USA" className="h-6 w-auto" />
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-purple-600 font-semibold">
              MAKEUP™. BEAUTY WITHOUT LIMITS
            </p>
            <p className="mt-2">&copy; MAKEUP 2021-2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
