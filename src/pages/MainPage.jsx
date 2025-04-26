import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF4E8] flex flex-col items-center p-8 gap-8">

      <div className="w-full max-w-5xl bg-white border-4 border-[#265DAB] rounded-2xl p-6 flex flex-col gap-4">

        <div className="flex flex-wrap gap-4 justify-center">
          
          <Select>
            <SelectTrigger className="w-72 border-2 border-[#265DAB]">
              <SelectValue placeholder="Вибери тип бізнесу (select)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Варіант 1</SelectItem>
              <SelectItem value="option2">Варіант 2</SelectItem>
              <SelectItem value="option3">Варіант 3</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            type="text" 
            placeholder="Введіть яку суму ви плануєте вкласти" 
            className="w-72 border-2 border-[#265DAB]"
          />
          <Input 
            type="text" 
            placeholder="Площа бізнесу" 
            className="w-72 border-2 border-[#265DAB]"
          />
          <Input 
            type="text" 
            placeholder="Кількість робітників" 
            className="w-72 border-2 border-[#265DAB]"
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button className="bg-[#265DAB] text-white px-10 py-4 rounded-full hover:bg-[#1e4b8a]">
            Розрахунок
          </Button>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-white border-4 border-[#265DAB] rounded-2xl p-6 flex flex-col gap-6">

        <div className="text-center text-lg font-semibold">
          Області в яких найкраще відкрити бізнес (на основі частоти повітряних тривог)
        </div>

        <ol className="flex flex-col gap-2">
          <li className="bg-gray-200 py-3 px-4 rounded-md">1. Луганська область</li>
          <li className="bg-gray-200 py-3 px-4 rounded-md">2. Луганська область</li>
          <li className="bg-gray-200 py-3 px-4 rounded-md">3. Луганська область</li>
          <li className="bg-gray-200 py-3 px-4 rounded-md">4. Луганська область</li>
          <li className="bg-gray-200 py-3 px-4 rounded-md">5. Луганська область</li>
        </ol>

        <div className="text-right text-sm font-medium mt-4">
          Загальна статистика:
        </div>

      </div>

    </div>
  );
};

export default MainPage;
