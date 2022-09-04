/* eslint-disable react/jsx-props-no-spreading */
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import "./FormTextarea.css";

type FormTextareaProps = {
  label: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder?: string;
  formState: FormState<FieldValues>;
  rules: any;
};

function FormTextarea({
  label,
  register,
  name,
  placeholder, // optional
  formState,
  rules,
}: FormTextareaProps) {
  return (
    <div className="FormTextarea">
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea placeholder={placeholder} {...register(name, rules)} />
      <br />
      {formState.errors[name] && (
        <p className="formfeedback">
          {String(formState.errors[name]?.message)}
        </p>
      )}
    </div>
  );
}

export default FormTextarea;
