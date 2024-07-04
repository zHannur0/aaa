import Header from "../Components/Header";
import telegramIcon from "../assets/telegramIcon.svg";
import hhIcon from "../assets/hhIcon.svg";
import linkedin from "../assets/linkedinIcon.svg";
import rowIcon from "../assets/row-45deg.svg";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";
import addAccount from "../assets/add.svg";
import link from "../assets/link.svg";
import write from "../assets/write.svg";
import { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://172.20.10.2:8000/api/v1";
export default function Home() {
  const [email, setEmail] = useState("");
  async function getStarted(e) {
    e.preventDefault();
    const doc = await axios.post("/users/auth", {
      email,
    });
    console.log(doc);
  }
  return (
    <main className="bg-[#F6F6F6] md:pb-[100px] sm:pb-[50px] pb-[120px] md:px-[30px]">
      <Header />
      <div className="w-[1150px] px-[15px] mx-[auto]">
        <div className="mt-[100px] md:text-start lg:text-center flex flex-col md:items-start lg:items-center">
          <h1 className="lg:text-[36px] font-bold leading-[44px]  mb-[28px] lg:w-[auto] md:w-[400px] sm:w-[270px] sm:text-[28px] sm:leading-[35px]">
            IHunter - автономный агент для поиска работы.
          </h1>
          <p className="text-[#747474] text-[18px] font-regular mb-[50px]">
            Результаты уже в течение первых 14 дней
          </p>
          <form
            onSubmit={getStarted}
            className="flex gap-[6px] md:flex-col lg:flex-row"
          >
            <input
              type="text"
              className="lg:w-[620px] md:w-[290px] h-[60px] rounded-[12px] px-[24px] text-[16px] font-regular placeholder:text-[#666]"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-[290px] h-[60px] bg-[#FF5858] rounded-[12px] text-[20px] text-white font-medium"
            >
              Get started
            </button>
          </form>
        </div>
        <div className="flex flex-col lg:items-center sm:items-start mt-[120px]">
          <h1 className="text-[28px] font-semibold leading-[50px] mb-[26px]">
            Берём данные с самых актуальных сервисов
          </h1>
          <p className="text-[#747474] font-regular text-[18px] ">
            Все вакансии в одном месте
          </p>
          <ul className="flex w-full lg:flex-row justify-between mt-[30px] md:flex-col md:space-y-[20px] lg:space-y-[0]">
            <li className="bg-[#0000000f]  border-[rgba(255, 255, 255, 0.05)] rounded-[12px] border-[1px] w-[350px] h-[90px]">
              <a
                href="#"
                className="justify-center gap-[18px]  flex items-center h-[100%]"
              >
                <img
                  className="max-w-[50px] max-h-[50px]"
                  src={hhIcon}
                  alt=""
                />{" "}
                <span className="text-[#000] text-[18px] font-semibold">
                  HEADHUNTER
                </span>
                <img
                  className="max-w-[40px] max-h-[40px]"
                  src={rowIcon}
                  alt=""
                />
              </a>
            </li>
            <li className="bg-[#0000000f]  border-[rgba(255, 255, 255, 0.05)] rounded-[12px] border-[1px] w-[350px] h-[90px]">
              <a
                href="#"
                className="justify-center gap-[18px]  flex items-center h-[100%]"
              >
                <img
                  className="max-w-[50px] max-h-[50px]"
                  src={linkedin}
                  alt=""
                />{" "}
                <span className="text-[#000] text-[18px] font-semibold">
                  LINKEDIN
                </span>
                <img
                  className="max-w-[40px] max-h-[40px]"
                  src={rowIcon}
                  alt=""
                />
              </a>
            </li>
            <li className="bg-[#0000000f]  border-[rgba(255, 255, 255, 0.05)] rounded-[12px] border-[1px] w-[350px] h-[90px]">
              <a
                href="#"
                className="justify-center gap-[18px]  flex items-center h-[100%]"
              >
                <img
                  className="max-w-[50px] max-h-[50px]"
                  src={telegramIcon}
                  alt=""
                />{" "}
                <span className="text-[#000] text-[18px] font-semibold">
                  TELEGRAM
                </span>
                <img
                  className="max-w-[40px] max-h-[40px]"
                  src={rowIcon}
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-[105px] lg:text-center md:text-start">
          <h1 className="text-[28px] font-semibold leading-[50px] mb-[80px] md:mb-[35px] ">
            Как работает I<span className="text-[#FF5858]">Hunter</span>?
          </h1>
          <div className="flex lg:flex-row justify-between md:flex-col md:space-y-[20px] lg:space-y-[0px]">
            <div className="flex flex-col justify-between md:space-y-[20px] lg:space-y-[0px]">
              <div className="h-[50%] w-[360px] rounded-[18px] bg-[white] flex items-center">
                <img
                  src={step1}
                  alt=""
                  className="max-w-[130px] max-h-[120px] "
                />
                <div className="text-start">
                  <h3 className="text-[#31D887] text-[18px] font-semibold mb-[5px] ">
                    Этап 1
                  </h3>
                  <p className="text-[#000] text-[18px] font-semibold mb-[15px] ">
                    Анализ пользователя
                  </p>
                  <p className="text-[13px] text-[#A0A0A0] font-semibold">
                    Создаем детальный портрет кандидата для точного поиска.
                  </p>
                </div>
              </div>
              <div className="h-[45%] w-[360px] rounded-[18px] bg-[white] flex items-center">
                <img
                  src={step2}
                  alt=""
                  className="max-w-[130px] max-h-[120px] "
                />
                <div className="text-start">
                  <h3 className="text-[#31D887] text-[18px] font-semibold mb-[5px] ">
                    Этап 2
                  </h3>
                  <p className="text-[#000] text-[18px] font-semibold mb-[15px] ">
                    Процесс подбора
                  </p>
                  <p className="text-[13px] text-[#A0A0A0] font-semibold">
                    Искусственный интеллект подберет каждому пользователю
                    подходящие вакансии.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[360px] rounded-[18px] bg-[white] h-[auto] pt-[30px]">
              <img src={step3} alt="" />
              <div className="text-start p-[30px]">
                <h3 className="text-[#31D887] text-[18px] font-semibold mb-[5px] ">
                  Этап 3
                </h3>
                <p className="text-[#000] text-[18px] font-semibold mb-[15px] ">
                  Сопроводительное письмо и Отклик
                </p>
                <p className="text-[13px] text-[#A0A0A0] font-semibold">
                  Искусственный интеллект напишет письмо для каждой вакансии и
                  отправит отклик.
                </p>
              </div>
            </div>
            <div className="w-[360px] rounded-[18px] bg-[white] h-[auto] pt-[30px]">
              <img src={step4} alt="" />
              <div className="text-start p-[30px]">
                <h3 className="text-[#31D887] text-[18px] font-semibold mb-[5px] ">
                  Этап 4
                </h3>
                <p className="text-[#000] text-[18px] font-semibold mb-[15px] ">
                  Контроль откликами
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[100px] flex justify-between lg:flex-row md:flex-col lg:space-y-[0px] md:space-y-[30px] md:items-start ">
          <div className="">
            <h1 className="text-[36px] font-bold mb-[22px] leading-[44px] ">
              Как начать?
            </h1>
            <p className="text-[#747474] text-[18px] font-regular mb-[30px]">
              Простой и легкий способ начать свою карьеру
            </p>
            <form className="flex gap-[5px]">
              <input
                className="bg-white w-[420px] rounded-[12px] h-[60px] px-[24px] text-[16px] text-[black] placeholder:text-[#666]"
                type="text"
                placeholder="Email address"
              />
              <button
                type="submit"
                className="w-[200px] rounded-[12px] bg-[#FF5858] text-[20px] font-medium text-[white]"
              >
                Get started
              </button>
            </form>
          </div>
          <ul className="flex flex-col gap-[20px] ">
            <li className="w-[480px]  bg-[#0000000f] flex items-center p-[20px] gap-[20px] rounded-[18px]">
              <img
                className="rounded-full max-w-[80px] max-h-[80px]"
                src={addAccount}
                alt=""
              />
              <div className="h-full flex flex-col justify-between">
                <h4 className="text-[20px] font-semibold">
                  Создайте свой аккаунт
                </h4>
                <p className="text-[#747474] text-[16px] leading-[24px]">
                  Ваша учетная запись и личные данные гарантированно в
                  безопасности.
                </p>
              </div>
            </li>
            <li className="w-[480px] bg-[#0000000f] flex items-center p-[20px] gap-[20px] rounded-[18px]">
              <img
                className="rounded-full max-w-[80px] max-h-[80px]"
                src={link}
                alt=""
              />
              <div className="h-full flex flex-col justify-between">
                <h4 className="text-[20px] font-semibold">
                  Привяжите свой hh или linkedin
                </h4>
                <p className="text-[#747474] text-[16px] leading-[24px]">
                  Привяжите, чтобы откликнуться напрямую
                </p>
              </div>
            </li>
            <li className="w-[480px] bg-[#0000000f] flex items-center p-[20px] gap-[20px] rounded-[18px]">
              <img
                className="rounded-full max-w-[80px] max-h-[80px]"
                src={write}
                alt=""
              />
              <div className="h-full flex flex-col justify-between">
                <h4 className="text-[20px] font-semibold">
                  Создайте свой аккаунт
                </h4>
                <p className="text-[#747474] text-[16px] leading-[24px]">
                  Чтобы AI нашел вашу желаемый позиции
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
