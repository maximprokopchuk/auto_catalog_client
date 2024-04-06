import { KeyboardEvent, useState } from "react";
import { InputNumber } from "primereact/inputnumber";

interface OnEnterNumberInputProps {
  onSubmit: (value: number) => void;
  defaultValue: number;
}

const OnEnterNumberInput = ({
  onSubmit,
  defaultValue,
}: OnEnterNumberInputProps) => {
  const [value, setValue] = useState<number | null>(null);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      if (value) {
        onSubmit(value);
      }
      setValue(null);
    }
  };
  return (
    <InputNumber
      value={value || defaultValue}
      onChange={(e) => setValue(e.value)}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
};

export default OnEnterNumberInput;
