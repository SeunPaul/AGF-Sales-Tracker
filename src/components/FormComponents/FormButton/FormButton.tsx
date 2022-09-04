import { ReactComponent as Spinner } from "../../../assets/icons/spinner.svg";
import "./FormButton.css";

type FormButtonProps = {
  label: string;
  error: boolean;
  loading: boolean;
};

function FormButton({ label, error, loading }: FormButtonProps) {
  return (
    <button
      className={`FormButton formbutton-big formbutton-green${
        error ? " formbutton-error" : ""
      }${loading ? " formbutton-loading" : ""}`}
      type="submit"
      disabled={loading || error}
    >
      {loading && <Spinner className="spinner" />}
      {label}
    </button>
  );
}

export default FormButton;
