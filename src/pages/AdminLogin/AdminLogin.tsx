import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import FormButton from "../../components/FormComponents/FormButton/FormButton";
import notify from "../../helpers/notify";
import "../Login/Login.css";
import "./AdminLogin.css";

// api service
import APIService from "../../utils/apiServices";

type LoginPropType = {
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
  user?: {
    role?: string;
  };
  setUser: (data: {
    id: number;
    uuid: string;
    username: string;
    role: string;
  }) => void;
};

function AdminLogin({ loggedIn, setLoggedIn, setUser }: LoginPropType) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();

  const onLogin: SubmitHandler<FieldValues> = (formData) => {
    setLoading(true);
    APIService.login({
      username: formData.username,
      password: formData.password,
    })
      .then((res) => {
        if (res.success) {
          const { data } = res;
          if (data.role !== "admin" && data.role !== "super admin") {
            setLoading(false);
            notify("error", "Unauthorized");
          } else {
            sessionStorage.setItem("accessToken", data.token);
            setUser(data);
            setLoggedIn(true);
            setLoading(false);
            navigate("/admin/dashboard");
          }
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

  useEffect(() => {
    if (loggedIn) {
      navigate("/admin/dashboard");
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  return loggedIn ? null : (
    <div className="Admin Login onboarding-page">
      <div className="onboarding-page-content">
        <div className="svg1" />
        <div className="svg2" />
        <div className="onboarding-header">
          <h3>AGF Sales Tracker</h3>
        </div>
        <div className="onboarding-body">
          <h3>Admin Login</h3>
          <form onSubmit={handleSubmit(onLogin)}>
            <FormInput
              label="Username"
              type="text"
              register={register}
              name="username"
              formState={formState}
              rules={{
                required: "Enter your username",
              }}
            />
            <FormInput
              label="Password"
              type="password"
              register={register}
              name="password"
              formState={formState}
              rules={{
                required: "Enter your password",
              }}
            />
            <FormButton label="Log In" error={false} loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
