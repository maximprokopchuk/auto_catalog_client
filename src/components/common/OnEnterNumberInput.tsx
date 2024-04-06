import { useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

interface OnEnterInputProps {
  placeholder?: string;
  defaultValue?: number;
  onSubmit: (value: number) => void;
  buttonText: string
  min?: number
}

const InputNumberForm = ({
  placeholder,
  onSubmit,
  defaultValue,
  buttonText,
  min
}: OnEnterInputProps) => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <form
      style={{ display: "flex", gap: "2rem" }}
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        if (value) {
          onSubmit(value);
          setValue(null);
        }
      }}
    >
      <InputNumber
        value={value || defaultValue || null}
        onChange={(e) => setValue(e.value)}
        placeholder={placeholder}
        onKeyDown={e => e.stopPropagation()}
        min={min}
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default InputNumberForm;
