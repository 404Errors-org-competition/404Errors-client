import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import mainImage from "../assets/main_image.png";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Де варто відкривати бізнес в умовах повітряних тривог?
          </h1>

          <p className="text-base md:text-lg text-slate-700">
            Калькулятор покаже, які втрати ви зазнаєте через зупинки та допоможе обрати оптимальний регіон для
            відкриття.
          </p>

          <p className="text-base md:text-lg text-slate-700">
            Наш інструмент розраховує різницю між потенційним і фактичним доходом під час повітряних тривог. Ви
            дізнаєтесь, скільки ви втрачаєте щомісяця та які області дозволять мінімізувати ці збитки.
          </p>

          <div className="pt-4">
            <Link to="/calculation">
              <Button
                variant="default"
                size="lg"
                className="bg-blue-800 hover:bg-blue-700 text-white font-medium text-base md:text-lg px-8 py-6 h-auto"
              >
                Почати розрахунок
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img src={mainImage} alt="Бізнес аналітика регіонів України" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
