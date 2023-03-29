import { ChangeEventHandler, FormEvent } from "react";

type Props = {
  labelContent: string;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value?: string;
};

function FormSelectInput({ labelContent, options, onChange, value }: Props) {
  return (
    <div className="my-2 flex items-center">
      <label className="mr-2">{labelContent}</label>
      <select
        value={value}
        className="flex-1 rounded-lg outline-none text-black p-1"
        onChange={onChange}
      >
        <option></option>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
}

export default FormSelectInput;
