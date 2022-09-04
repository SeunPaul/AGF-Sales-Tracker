/* eslint-disable react/jsx-props-no-spreading */
import { Control, Controller, FieldValues, FormState } from "react-hook-form";
import Select from "react-select";
import "./FormSelect.css";

type FormSelectProps = {
  label: string;
  subLabel?: string;
  bottomLabel?: string;
  control: Control<FieldValues, any> | undefined;
  name: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  formState: FormState<FieldValues>;
  rules: any;
  disabled?: boolean;
  multi?: boolean;
};

function FormSelect({
  label,
  subLabel, // optional
  bottomLabel, // optional
  control,
  name,
  placeholder, // optional
  options,
  formState,
  rules,
  disabled,
  multi,
}: FormSelectProps) {
  return (
    <div className="FormSelect FormInput">
      <label htmlFor={name}>{label}</label>
      {subLabel && <p className="subLabel">{subLabel}</p>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            options={options}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            placeholder={placeholder}
            isDisabled={disabled}
            isMulti={multi}
          />
        )}
      />
      {bottomLabel && <p className="bottom-label">{bottomLabel}</p>}
      {formState.errors[name] && (
        <p className="formfeedback">
          {String(formState.errors[name]?.message)}
        </p>
      )}
    </div>
  );
}

export default FormSelect;
