import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface OnEnterInputProps {
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  buttonText: string;
}

const InputForm = ({
  placeholder,
  onSubmit,
  defaultValue,
  buttonText,
}: OnEnterInputProps) => {
  const [value, setValue] = useState("");
  return (
    <form
      style={{ display: "flex", gap: "2rem" }}
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit(value);
        setValue("");
      }}
    >
      <InputText
        value={value || defaultValue || ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => e.stopPropagation()}
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default InputForm;
