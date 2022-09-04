import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import FormSelect from "../../components/FormComponents/FormSelect/FormSelect";
import FormButton from "../../components/FormComponents/FormButton/FormButton";
import add from "../../assets/icons/add.png";
import deleteIcon from "../../assets/icons/delete.svg";
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

function OrderForm({ user, setLoggedIn, setUser }: OrderPropType) {
  const [loading, setLoading] = useState(false);
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

  const brands = [
    { label: "WorkingGirlNG", value: "WorkingGirlNG" },
    { label: "ShirtRepublic", value: "ShirtRepublic" },
    { label: "OfficePlug", value: "OfficePlug" },
    { label: "OliviersCloset", value: "OliviersCloset" },
    { label: "Stylestation", value: "Stylestation" },
    { label: "Denimsng", value: "Denimsng" },
    { label: "KhadeejahNG", value: "KhadeejahNG" },
    { label: "SKactive", value: "SKactive" },
  ];

  const prodManagers = [
    { label: "Aighangbe Tina", value: "Aighangbe Tina" },
    { label: "Ogoh mercy chiwendu", value: "Ogoh mercy chiwendu" },
    { label: "Joseph Agnes", value: "Joseph Agnes" },
    { label: "Ekine Kehinde", value: "Ekine Kehinde" },
    { label: "Adebimpe", value: "Adebimpe" },
    { label: "Ajimoti Tunde", value: "Ajimoti Tunde" },
  ];

  const smManagers = [
    { label: "Adebimpe Aderemi", value: "Adebimpe Aderemi" },
    { label: "Onabanjo Azeezat Olamide", value: "Onabanjo Azeezat Olamide" },
    { label: "Vincent Theophilus", value: "Vincent Theophilus" },
    { label: "Helen Idokoe", value: "Helen Idokoe" },
    { label: "Ajimoti Tunde", value: "Ajimoti Tunde" },
  ];

  const items = [
    { label: "Dress", value: "Dress" },
    { label: "Top", value: "Top" },
    { label: "Skirt", value: "Skirt" },
    { label: "Pants", value: "Pants" },
    { label: "Shorts", value: "Shorts" },
    { label: "Blazers", value: "Blazers" },
    { label: "Abaya", value: "Abaya" },
    { label: "Blazer and Pant", value: "Blazer and Pant" },
    { label: "Blazer and Skirt", value: "Blazer and Skirt" },
    { label: "Top and Pant", value: "Top and Pant" },
    { label: "Top and Skirt", value: "Top and Skirt" },
  ];

  const itemsCost = [
    { label: "5000", value: "5000" },
    { label: "6000", value: "6000" },
    { label: "7000", value: "7000" },
    { label: "7500", value: "7500" },
    { label: "7800", value: "7800" },
    { label: "8000", value: "8000" },
    { label: "9000", value: "9000" },
    { label: "10000", value: "10000" },
    { label: "11000", value: "11000" },
    { label: "12000", value: "12000" },
    { label: "13000", value: "13000" },
    { label: "14000", value: "14000" },
    { label: "15000", value: "15000" },
    { label: "16000", value: "16000" },
    { label: "17000", value: "17000" },
    { label: "18000", value: "18000" },
    { label: "19000", value: "19000" },
    { label: "20000", value: "20000" },
    { label: "21000", value: "21000" },
    { label: "22000", value: "22000" },
    { label: "23000", value: "23000" },
    { label: "24000", value: "24000" },
    { label: "25000", value: "25000" },
    { label: "26000", value: "26000" },
    { label: "27000", value: "27000" },
    { label: "28000", value: "28000" },
    { label: "29000", value: "29000" },
    { label: "30000", value: "30000" },
  ];

  const cutters = [
    { label: "Jhonson", value: "Jhonson" },
    { label: "Friday", value: "Friday" },
    { label: "Sarah", value: "Sarah" },
    { label: "Michael", value: "Michael" },
  ];

  const stitchers = [
    { label: "Ibrahim", value: "Ibrahim" },
    { label: "Usman", value: "Usman" },
    { label: "Abdul-Rahmon", value: "Abdul-Rahmon" },
    { label: "Precious", value: "Precious" },
    { label: "Yinka", value: "Yinka" },
    { label: "Olokodana", value: "Olokodana" },
    { label: "Anu", value: "Anu" },
    { label: "Iseoluwa", value: "Iseoluwa" },
    { label: "Michael", value: "Michael" },
    { label: "Janet", value: "Janet" },
    { label: "Suliyat", value: "Suliyat" },
    { label: "Kehinde", value: "Kehinde" },
    { label: "George", value: "George" },
    { label: "Elizabeth", value: "Elizabeth" },
    { label: "Shade", value: "Shade" },
    { label: "Opeyemi Girl", value: "Opeyemi Girl" },
    { label: "Imole", value: "Imole" },
    { label: "Matthew", value: "Matthew" },
    { label: "Eniola", value: "Eniola" },
    { label: "Yetunde", value: "Yetunde" },
    { label: "Ahmed", value: "Ahmed" },
    { label: "Hawawu", value: "Hawawu" },
    { label: "Hannah", value: "Hannah" },
    { label: "Mrs Nancy", value: "Mrs Nancy" },
    { label: "Ramota", value: "Ramota" },
    { label: "Deborah", value: "Deborah" },
    { label: "Barakat", value: "Barakat" },
    { label: "Mary", value: "Mary" },
    { label: "Fatimoh", value: "Fatimoh" },
    { label: "Fatiu", value: "Fatiu" },
    { label: "Wumi2", value: "Wumi2" },
    { label: "Wole", value: "Wole" },
    { label: "Funmi", value: "Funmi" },
    { label: "Abosede", value: "Abosede" },
    { label: "Toyin", value: "Toyin" },
    { label: "Opeyemi Boy", value: "Opeyemi Boy" },
  ];

  const cutCost = [
    { label: "100", value: "100" },
    { label: "150", value: "150" },
    { label: "200", value: "200" },
    { label: "250", value: "250" },
  ];

  const tailoringFee = [
    { label: "400", value: "400" },
    { label: "500", value: "500" },
    { label: "600", value: "600" },
    { label: "700", value: "700" },
    { label: "800", value: "800" },
    { label: "900", value: "900" },
    { label: "1000", value: "1000" },
    { label: "1200", value: "1200" },
    { label: "1500", value: "1500" },
    { label: "2000", value: "2000" },
    { label: "2500", value: "2500" },
    { label: "3000", value: "3000" },
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

  return (
    <div>
      <div className="public-page-wrapper">
        <div className="OrderForm public-page">
          <div className="svg-left" />
          <div className="svg-right" />
          <div className="contact-section2 contact-section">
            <p className="logout" onClick={onLogout}>
              Logout
            </p>
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
                placeholder="Select Brand"
                options={brands}
                formState={formState}
                rules={{
                  required: "Select Brand",
                }}
              />
              <FormSelect
                label="Production Manager"
                control={control}
                name="production_manager"
                placeholder="Select Production Manager"
                options={prodManagers}
                formState={formState}
                rules={{
                  required: "Select Production Manager",
                }}
              />
              <FormSelect
                label="SM Manager"
                control={control}
                name="sm_manager"
                placeholder="Select SM Manager"
                options={smManagers}
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
                    placeholder="Select Item Ordered"
                    options={items}
                    formState={formState}
                    rules={{
                      required: "Select Item Ordered",
                    }}
                  />
                  <FormSelect
                    label="Item Cost"
                    control={control}
                    name={`item_cost${i}`}
                    placeholder="Select Item Cost"
                    options={itemsCost}
                    formState={formState}
                    rules={{
                      required: "Select Item Cost",
                    }}
                  />
                  <FormSelect
                    label="Cutter"
                    control={control}
                    name={`cutter${i}`}
                    placeholder="Select Cutter"
                    options={cutters}
                    formState={formState}
                    rules={{
                      required: "Select Cutter",
                    }}
                  />
                  <FormSelect
                    label="Stitcher"
                    control={control}
                    name={`stitcher${i}`}
                    placeholder="Select Stitcher"
                    options={stitchers}
                    formState={formState}
                    rules={{
                      required: "Select Stitcher",
                    }}
                  />
                  <FormSelect
                    label="Cut Cost"
                    control={control}
                    name={`cut_cost${i}`}
                    placeholder="Select Cut Cost"
                    options={cutCost}
                    formState={formState}
                    rules={{
                      required: "Select Cut Cost",
                    }}
                  />
                  <FormSelect
                    label="Tailoring Fee"
                    control={control}
                    name={`tailoring_fee${i}`}
                    placeholder="Select Tailoring Fee"
                    options={tailoringFee}
                    formState={formState}
                    rules={{
                      required: "Select Tailoring Fee",
                    }}
                  />
                </div>
              ))}
              <div className="add-another">
                <img src={add} alt="" />
                <p onClick={addItem}>Add Another Item</p>
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
