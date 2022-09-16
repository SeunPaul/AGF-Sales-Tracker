import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import FormSelect from "../../components/FormComponents/FormSelect/FormSelect";
import FormButton from "../../components/FormComponents/FormButton/FormButton";
import add from "../../assets/icons/add.png";
import deleteIcon from "../../assets/icons/delete.svg";
import userIcon from "../../assets/icons/user.png";
import "./OrderForm.css";
import notify from "../../helpers/notify";

// api service
import APIService from "../../utils/apiServices";

type OrderPropType = {
  user?: {
    role?: string;
    username?: string;
  };
  setLoggedIn: (state: boolean) => void;
  setUser: (
    data:
      | {
          id: number;
          uuid: string;
          username: string;
          role: string;
        }
      | {}
  ) => void;
};

type OptionType = {
  type: string;
  value: string;
};

function OrderForm({ user, setLoggedIn, setUser }: OrderPropType) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const { register, formState, control, handleSubmit } = useForm();

  const [itemsTrack, setItemsTrack] = useState([1]);

  const [change, setChange] = useState(false);

  const navigate = useNavigate();

  const states = [
    { label: "Abia", value: "Abia" },
    { label: "Abuja", value: "Abuja" },
    { label: "Adamawa", value: "Adamawa" },
    { label: "Akwa Ibom", value: "Akwa Ibom" },
    { label: "Anambra", value: "Anambra" },
    { label: "Bauchi", value: "Bauchi" },
    { label: "Bayelsa", value: "Bayelsa" },
    { label: "Benue", value: "Benue" },
    { label: "Borno", value: "Borno" },
    { label: "Cross River", value: "Cross River" },
    { label: "Delta", value: "Delta" },
    { label: "Ebonyi", value: "Ebonyi" },
    { label: "Edo", value: "Edo" },
    { label: "Ekiti", value: "Ekiti" },
    { label: "Enugu", value: "Enugu" },
    { label: "Gombe", value: "Gombe" },
    { label: "Imo", value: "Imo" },
    { label: "Jigawa", value: "Jigawa" },
    { label: "Kaduna", value: "Kaduna" },
    { label: "Kano", value: "Kano" },
    { label: "Kastina", value: "Kastina" },
    { label: "Kebbi", value: "Kebbi" },
    { label: "Kogi", value: "Kogi" },
    { label: "Kwara", value: "Kwara" },
    { label: "Lagos", value: "Lagos" },
    { label: "Nasarawa", value: "Nasarawa" },
    { label: "Niger", value: "Niger" },
    { label: "Ogun", value: "Ogun" },
    { label: "Ondo", value: "Ondo" },
    { label: "Osun", value: "Osun" },
    { label: "Oyo", value: "Oyo" },
    { label: "Plateau", value: "Plateau" },
    { label: "River", value: "River" },
    { label: "Sokoto", value: "Sokoto" },
    { label: "Taraba", value: "Taraba" },
    { label: "Yobe", value: "Yobe" },
    { label: "Zamfarawa", value: "Zamfarawa" },
  ];

  const onLogout = () => {
    APIService.logout()
      .then((res) => {
        notify("success", res.message);
        setLoggedIn(false);
        setUser({});
        navigate("/");
      })
      .catch(() => {
        notify("error", "error");
      });
  };

  const addItem = () => {
    const newItemTrack = itemsTrack;
    newItemTrack.push(newItemTrack.length + 1);
    setItemsTrack(newItemTrack);
    setChange(!change);
  };

  const removeItem = () => {
    const newItemTrack = itemsTrack;
    newItemTrack.pop();
    setItemsTrack(newItemTrack);
    setChange(!change);
  };

  const onSubmitOrder: SubmitHandler<FieldValues> = (formData) => {
    setLoading(true);
    APIService.createOrder({
      customer_name: formData.customer_name,
      country: formData.country.value,
      state: formData.state.value,
      city: formData.city,
      address: formData.address,
      phone_number: formData.phone_number,
      email: formData.email,
      brand: formData.brand.value,
      production_manager: formData.production_manager.value,
      sm_manager: formData.sm_manager.value,
      uploader: user?.username,
      items: itemsTrack.map((item, i) => ({
        item_ordered: formData[`item_ordered${i}`].value,
        item_cost: formData[`item_cost${i}`].value,
        cutter: formData[`cutter${i}`].value,
        stitcher: formData[`stitcher${i}`].value,
        cut_cost: formData[`cut_cost${i}`].value,
        tailoring_fee: formData[`tailoring_fee${i}`].value,
      })),
    })
      .then((res) => {
        if (res.success) {
          setLoading(false);
          notify("success", res.message);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
    APIService.getOptions()
      .then((res) => {
        if (res.success) {
          const { data } = res;

          setOptions(data.options);
        } else {
          notify("error", res.message);
        }
      })
      .catch(() => {
        notify("error", "connection error");
      });
  }, []);

  return (
    <div>
      <div className="public-page-wrapper">
        <div className="OrderForm public-page">
          <div className="svg-left" />
          <div className="svg-right" />
          <div className="contact-section2 contact-section">
            <div className="info-logout">
              <div>
                <img src={userIcon} alt="" />
                <p>{user?.username}</p>
              </div>
              <p className="logout" onClick={onLogout}>
                Logout
              </p>
            </div>
            <div className="order-form-heading">
              <h2>Order Form</h2>
              <p>Fill the form below to raise an order</p>
            </div>
            <form
              className="contact-form"
              onSubmit={handleSubmit(onSubmitOrder)}
            >
              <FormInput
                label="Customer Name"
                type="text"
                register={register}
                name="customer_name"
                formState={formState}
                rules={{
                  required: "Enter Customer Name",
                }}
              />
              <FormSelect
                label="Country"
                control={control}
                name="country"
                placeholder="Select Country"
                options={[{ label: "Nigeria", value: "Nigeria" }]}
                formState={formState}
                rules={{
                  required: "Select Country",
                }}
              />
              <FormSelect
                label="State"
                control={control}
                name="state"
                placeholder="Select State"
                options={states}
                formState={formState}
                rules={{
                  required: "Select State",
                }}
              />
              <FormInput
                label="City"
                type="text"
                register={register}
                name="city"
                formState={formState}
                rules={{
                  required: "Enter City",
                }}
              />
              <FormInput
                label="Address"
                type="text"
                register={register}
                name="address"
                formState={formState}
                rules={{
                  required: "Enter Address",
                }}
              />
              <FormInput
                label="Phone Number"
                type="tel"
                register={register}
                name="phone_number"
                formState={formState}
                rules={{
                  required: "Enter Phone Number",
                }}
              />
              <FormInput
                label="Email"
                type="email"
                register={register}
                name="email"
                formState={formState}
                rules={{
                  required: "Enter Email",
                }}
              />
              <FormSelect
                label="Brand"
                control={control}
                name="brand"
                placeholder={options.length ? "Select Brand" : "Loading..."}
                options={options
                  .filter((item) => item.type === "brands")
                  .map((item) => ({ label: item.value, value: item.value }))}
                formState={formState}
                rules={{
                  required: "Select Brand",
                }}
              />
              <FormSelect
                label="Production Manager"
                control={control}
                name="production_manager"
                placeholder={
                  options.length ? "Select Production Manager" : "Loading..."
                }
                options={options
                  .filter((item) => item.type === "prodManagers")
                  .map((item) => ({ label: item.value, value: item.value }))}
                formState={formState}
                rules={{
                  required: "Select Production Manager",
                }}
              />
              <FormSelect
                label="SM Manager"
                control={control}
                name="sm_manager"
                placeholder={
                  options.length ? "Select SM Manager" : "Loading..."
                }
                options={options
                  .filter((item) => item.type === "smManagers")
                  .map((item) => ({ label: item.value, value: item.value }))}
                formState={formState}
                rules={{
                  required: "Select SM Manager",
                }}
              />
              <p className="items-section-label">Cloting Items</p>
              {itemsTrack.map((track, i) => (
                <div key={track}>
                  <div className="items-label">
                    <p>Item {i + 1}</p>
                    {i === itemsTrack.length - 1 && i !== 0 && (
                      <img src={deleteIcon} alt="" onClick={removeItem} />
                    )}
                  </div>
                  <FormSelect
                    label="Item Ordered"
                    control={control}
                    name={`item_ordered${i}`}
                    placeholder={
                      options.length ? "Select Item Ordered" : "Loading..."
                    }
                    options={options
                      .filter((item) => item.type === "items")
                      .map((item) => ({
                        label: item.value,
                        value: item.value,
                      }))}
                    formState={formState}
                    rules={{
                      required: "Select Item Ordered",
                    }}
                  />
                  <FormSelect
                    label="Item Cost"
                    control={control}
                    name={`item_cost${i}`}
                    placeholder={
                      options.length ? "Select Item Cost" : "Loading..."
                    }
                    options={options
                      .filter((item) => item.type === "itemsCost")
                      .map((item) => ({
                        label: item.value,
                        value: item.value,
                      }))}
                    formState={formState}
                    rules={{
                      required: "Select Item Cost",
                    }}
                  />
                  <FormSelect
                    label="Cutter"
                    control={control}
                    name={`cutter${i}`}
                    placeholder={
                      options.length ? "Select Cutter" : "Loading..."
                    }
                    options={options
                      .filter((item) => item.type === "cutters")
                      .map((item) => ({
                        label: item.value,
                        value: item.value,
                      }))}
                    formState={formState}
                    rules={{
                      required: "Select Cutter",
                    }}
                  />
                  <FormSelect
                    label="Stitcher"
                    control={control}
                    name={`stitcher${i}`}
                    placeholder={
                      options.length ? "Select Stitcher" : "Loading..."
                    }
                    options={options
                      .filter((item) => item.type === "stitchers")
                      .map((item) => ({
                        label: item.value,
                        value: item.value,
                      }))}
                    formState={formState}
                    rules={{
                      required: "Select Stitcher",
                    }}
                  />
                  <FormSelect
                    label="Cut Cost"
                    control={control}
                    name={`cut_cost${i}`}
                    placeholder={
                      options.length ? "Select Cut Cost" : "Loading..."
                    }
                    options={options
                      .filter((item) => item.type === "cutCost")
                      .map((item) => ({
                        label: item.value,
                        value: item.value,
                      }))}
                    formState={formState}
                    rules={{
                      required: "Select Cut Cost",
                    }}
                  />
                  <FormSelect
                    label="Tailoring Fee"
                    control={control}
                    name={`tailoring_fee${i}`}
                    placeholder={
                      options.length ? "Select Tailoring Fee" : "Loading..."
                    }
                    options={options
                      .filter((item) => item.type === "tailoringFee")
                      .map((item) => ({
                        label: item.value,
                        value: item.value,
                      }))}
                    formState={formState}
                    rules={{
                      required: "Select Tailoring Fee",
                    }}
                  />
                </div>
              ))}
              <div className="add-another" onClick={addItem}>
                <img src={add} alt="" />
                <p>Add Another Item</p>
              </div>
              <FormButton label="Raise Order" error={false} loading={loading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
