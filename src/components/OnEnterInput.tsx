import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface OnEnterInputProps {
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
}

const OnEnterInput = ({
  placeholder,
  onSubmit,
  defaultValue,
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
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default OnEnterInput;
