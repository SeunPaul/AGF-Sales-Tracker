/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import { ReactComponent as EyeOpen } from "../../../assets/icons/eyeOpen.svg";
import { ReactComponent as EyeClose } from "../../../assets/icons/eyeClose.svg";
import "./FormInput.css";

type FormInputProps = {
  label: string;
  subLabel?: string;
  bottomLabel?: string;
  type: "text" | "tel" | "password" | "email" | "number" | "url";
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder?: string;
  formState: FormState<FieldValues>;
  rules: any;
  disabled?: boolean;
};

function FormInput({
  label,
  subLabel, // optional
  bottomLabel, // optional
  type,
  register,
  name,
  placeholder, // optional
  formState,
  rules,
  disabled,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="FormInput">
      <label htmlFor={name}>{label}</label>
      {subLabel && <p className="subLabel">{subLabel}</p>}
      <div className="input-wrapper">
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, rules)}
        />
        {type === "password" && showPassword && (
          <EyeOpen onClick={() => setShowPassword(false)} />
        )}
        {type === "password" && !showPassword && (
          <EyeClose onClick={() => setShowPassword(true)} />
        )}
      </div>
      {bottomLabel && <p className="bottom-label">{bottomLabel}</p>}
      {formState.errors[name] && (
        <p className="formfeedback">
          {String(formState.errors[name]?.message)}
        </p>
      )}
    </div>
  );
}

export default FormInput;
