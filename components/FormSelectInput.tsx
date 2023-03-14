import { ChangeEventHandler, FormEvent } from "react";

type Props = {
  labelContent: string;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

function FormSelectInput({ labelContent, options, onChange }: Props) {
  return (
    <div className="my-2 flex items-center">
      <label className="mr-2">{labelContent}</label>
      <select
        className="flex-1 rounded-lg outline-none text-black p-1"
        onChange={onChange}
      >
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
}

export default FormSelectInput;
