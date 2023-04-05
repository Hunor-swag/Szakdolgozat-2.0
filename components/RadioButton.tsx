type Props = {
  value: string;
  label: string;
  name: string;
  selectedValue: string;
  setSelectedValue: Function;
};

export function RadioButton({
  value,
  label,
  name,
  selectedValue,
  setSelectedValue,
}: Props) {
  return (
    <div className="flex flex-col p-5">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={() => setSelectedValue(value)}
        checked={selectedValue === value}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
}
