import { ChangeEventHandler, FormEvent } from "react";

type Props = {
  labelContent: string;
  inputType: string;
  inputValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputPlaceholder?: string;
};

function FormTextInput({
  labelContent,
  inputType,
  inputValue,
  onChange,
  inputPlaceholder,
}: Props) {
  return (
    <div className="mt-5 my-2 flex justify-between items-center">
      <label className="mr-2">{labelContent}</label>
      <input
        type={inputType}
        value={inputValue}
        onChange={onChange}
        placeholder={inputPlaceholder}
        className="flex-1 rounded-md bg-gray-300 p-2 hover:bg-gray-200 outline-none caret-black text-black"
      />
    </div>
  );
}

export default FormTextInput;
