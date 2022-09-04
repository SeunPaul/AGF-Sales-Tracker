/* eslint-disable react/jsx-props-no-spreading */
import { FieldValues, UseFormRegister } from "react-hook-form";
import "./FormCheckbox.css";

type FormCheckboxProps = {
  register: UseFormRegister<FieldValues>;
  name: string;
  label?: string;
  rules: any;
};

function FormCheckbox({ register, name, label, rules }: FormCheckboxProps) {
  return (
    <div className="FormCheckbox">
      <input type="checkbox" {...register(name, rules)} />
      {label && <p>{label}</p>}
    </div>
  );
}

export default FormCheckbox;
