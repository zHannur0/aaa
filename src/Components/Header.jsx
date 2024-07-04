import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import avatar from "../assets/ava.svg";
export default function Header() {
  return (
    <header>
      <div className="w-[1150px] px-[15px] mx-[auto] h-[90px] flex items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="" className="max-w-[150px] max-h-[50px]" />
        </Link>
          <div className={"flex font-semibold text-2xl gap-[20px] items-center"}>
              <Link to={"/main"}>
                  <p>
                      Главная
                  </p>
              </Link>
              <Link to={"/"}>
                  <p>
                      ИИ советы
                  </p>
              </Link>
              <Link to={"/dashboard"}>
                  <p>
                      Панель
                  </p>
              </Link>
              <Link to={"/profile"}>
                  <img src={avatar} alt="avatar" className="max-w-[150px] max-h-[50px]"/>
              </Link>
          </div>
      </div>
    </header>
  );
}
