import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import FormSelect from "../FormComponents/FormSelect/FormSelect";
import FormButton from "../../components/FormComponents/FormButton/FormButton";
import notify from "../../helpers/notify";

// api service
import APIService from "../../utils/apiServices";

type PropsType = {
  role?: string;
};

function AddUser({ role }: PropsType) {
  const [loading, setLoading] = useState(false);

  const { register, formState, handleSubmit, control } = useForm();

  const onAddUser: SubmitHandler<FieldValues> = (formData) => {
    setLoading(true);
    APIService.createUser({
      username: formData.username,
      password: formData.password,
      role: formData.role.value,
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

  const adminRoleOptions = [{ label: "user", value: "user" }];

  const superAdminRoleOptions = [
    { label: "user", value: "user" },
    { label: "admin", value: "admin" },
    { label: "super admin", value: "super admin" },
  ];

  return (
    <div className="Login onboarding-page">
      <div className="onboarding-page-content">
        <h3>Add User</h3>
        <form onSubmit={handleSubmit(onAddUser)}>
          <FormInput
            label="Username"
            type="text"
            register={register}
            name="username"
            formState={formState}
            rules={{
              required: "Enter Username",
            }}
          />
          <FormSelect
            label="Role"
            control={control}
            name="role"
            placeholder="Select Role"
            options={
              role === "admin" ? adminRoleOptions : superAdminRoleOptions
            }
            formState={formState}
            rules={{
              required: "Select Role",
            }}
          />
          <FormInput
            label="Password"
            type="password"
            register={register}
            name="password"
            formState={formState}
            rules={{
              required: "Enter Password",
            }}
          />
          <FormButton label="Add User" error={false} loading={loading} />
        </form>
      </div>
    </div>
  );
}

export default AddUser;
