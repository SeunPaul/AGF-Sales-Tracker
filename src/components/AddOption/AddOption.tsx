import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import FormSelect from "../FormComponents/FormSelect/FormSelect";
import FormButton from "../../components/FormComponents/FormButton/FormButton";
import notify from "../../helpers/notify";

// api service
import APIService from "../../utils/apiServices";

function AddOption() {
  const [loading, setLoading] = useState(false);

  const { register, formState, handleSubmit, control } = useForm();

  const onAddOption: SubmitHandler<FieldValues> = (formData) => {
    setLoading(true);
    APIService.createOption({
      type: formData.type.value,
      value: formData.value,
    })
      .then((res) => {
        if (res.success) {
          setLoading(false);
          notify("success", res.message);
        } else {
          setLoading(false);
          notify("error", res.message);
        }
      })
      .catch(() => {
        setLoading(false);
        notify("error", "An error occured. Check your connection");
      });
  };

  const options = [
    { label: "Brands", value: "brands" },
    { label: "Prod Managers", value: "prodManagers" },
    { label: "SM Manager", value: "smManagers" },
    { label: "Item Ordered", value: "items" },
    { label: "Item Cost", value: "itemsCost" },
    { label: "Cutter", value: "cutters" },
    { label: "Stitcher", value: "stitchers" },
    { label: "Cut Cost", value: "cutCost" },
    { label: "Tailoring Fee", value: "tailoringFee" },
  ];

  return (
    <div className="Login onboarding-page">
      <div className="onboarding-page-content">
        <h3>Add Option</h3>
        <form onSubmit={handleSubmit(onAddOption)}>
          <FormSelect
            label="Option Type"
            control={control}
            name="type"
            placeholder="Select Option Type"
            options={options}
            formState={formState}
            rules={{
              required: "Select Option Type",
            }}
          />
          <FormInput
            label="Value"
            type="text"
            register={register}
            name="value"
            formState={formState}
            rules={{
              required: "Enter value",
            }}
          />
          <FormButton label="Add Option" error={false} loading={loading} />
        </form>
      </div>
    </div>
  );
}

export default AddOption;
