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

const DatePickerWithTime: React.FC<Props> = ({
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
    <div className="flex items-center justify-center">
      <label className="w-1/2">{label}</label>
      <DatePicker
        className="text-black rounded-lg p-2 cursor-pointer w-full"
        selected={startDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd H:mm"
        minDate={new Date()}
        showYearDropdown
        showTimeSelect
        timeFormat="H:mm"
        timeIntervals={60}
        scrollableYearDropdown
        yearDropdownItemNumber={10}
        placeholderText="Válasszon dátumot"
      />
    </div>
  );
};

export default DatePickerWithTime;
