import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BusinessForm = ({ onCalculate }) => {
  return (
    <div className="w-full max-w-5xl border-4 border-[#265DAB] bg-white rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <Select>
          <SelectTrigger className="w-[230px] sm:w-[280px] border-2 bg-white border-[#265DAB]">
            <SelectValue placeholder="Тип бізнесу / Оберіть зі списку" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cafe">Кав'ярня</SelectItem>
            <SelectItem value="restaurant">Ресторан</SelectItem>
            <SelectItem value="shop">Магазин</SelectItem>
            <SelectItem value="salon">Салон краси</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Сума інвестицій, €"
          className="w-[230px] sm:w-[280px] border-2 bg-white border-[#265DAB]"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-1">
        <Input
          type="text"
          placeholder="Площа приміщення, м²"
          className="w-[230px] sm:w-[280px] border-2 bg-white border-[#265DAB]"
        />
        <Input
          type="text"
          placeholder="Кількість співробітників"
          className="w-[230px] sm:w-[280px] border-2 bg-white border-[#265DAB]"
        />
      </div>

      <div className="flex justify-center mt-2">
        <Button onClick={onCalculate} className="bg-[#265DAB] text-white px-8 py-2 text-base hover:bg-[#1e4b8a]">
          Обрахувати втрати
        </Button>
      </div>
    </div>
  );
};

export default BusinessForm;
