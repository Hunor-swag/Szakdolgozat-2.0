import { MouseEventHandler } from "react";

type Props = {
  labelContent: string;
  name: string;
  border?: boolean;
  checked?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

export function FormRadioInput({
  labelContent,
  name,
  border,
  checked,
  onClick,
}: Props) {
  return (
    <div
      className={`flex flex-col justify-center border- ${
        border && "border-2 border-blue-200"
      } p-3 rounded-3xl mx- `}
    >
      <input
        onChange={() => {}}
        onClick={onClick}
        type="radio"
        name={name}
        checked={checked}
      />
      <label className="my-2 mr-2">{labelContent}</label>
    </div>
  );
}
