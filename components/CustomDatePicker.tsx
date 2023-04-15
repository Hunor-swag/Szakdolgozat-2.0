import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hu from "date-fns/locale/hu";

registerLocale("hu", hu);

interface Props {
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
  label: string;
}

const CustomDatePicker: React.FC<Props> = ({
  selectedDate,
  handleDateChange,
  label,
}) => {
  const [startDate, setStartDate] = useState<Date>(selectedDate);

  const handleChange = (date: Date) => {
    setStartDate(date);
    handleDateChange(date);
  };

  return (
    <div className="flex justify-between items-center">
      <label className="w-1/2">{label}</label>
      <DatePicker
        className="text-black rounded-lg p-2 cursor-pointer w-full"
        selected={startDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText="Válasszon dátumot"
      />
    </div>
  );
};

export default CustomDatePicker;
