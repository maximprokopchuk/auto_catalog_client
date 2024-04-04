import { KeyboardEvent, useState } from "react";
import { InputText } from "primereact/inputtext";

interface NewEntityInputProps {
  placeholder: string;
  onSubmit: (value: string) => void;
}

const NewEntityInput = ({ placeholder, onSubmit }: NewEntityInputProps) => {
  const [value, setValue] = useState("");
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value);
      setValue("");
    }
  };
  return (
    <InputText
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
};

export default NewEntityInput;
