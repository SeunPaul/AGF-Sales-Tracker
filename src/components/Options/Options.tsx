import { useEffect, useState } from "react";
import deleteIcon from "../../assets/icons/delete.svg";
import notify from "../../helpers/notify";
import "../Users/Users.css";
import "./Options.css";

// api service
import APIService from "../../utils/apiServices";
type OptionType = {
  id: string;
  type: string;
  value: string;
}[];
function Options() {
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [options, setOptions] = useState<OptionType>([]);
  const [selectedOption, setSelectedOption] = useState("brands");
  const [refresh, setRefresh] = useState(false);

  const deleteOption = (id: string) => {
    if (
      window.confirm(
        "You are about to delete this option. This action can not be reversed"
      )
    ) {
      APIService.deleteOption({ optionId: id })
        .then((res) => {
          if (res.success) {
            notify("success", res.message);
            setRefresh(!refresh);
          } else {
            notify("error", res.message);
          }
        })
        .catch(() => {
          notify("error", "connection error");
        });
    }
  };

  useEffect(() => {
    APIService.getOptions()
      .then((res) => {
        if (res.success) {
          const { data } = res;

          setOptions(data.options);
          setOptionsLoading(false);
        } else {
          notify("error", res.message);
          setOptionsLoading(false);
        }
      })
      .catch(() => {
        notify("error", "connection error");
        setOptionsLoading(false);
      });
  }, [refresh]);

  return optionsLoading ? (
    <p>options loading...</p>
  ) : (
    <div className="Options">
      <div className="options-nav">
        <p
          onClick={() => {
            setSelectedOption("brands");
          }}
        >
          Brands
        </p>
        <p
          onClick={() => {
            setSelectedOption("prodManagers");
          }}
        >
          Prod Managers
        </p>
        <p
          onClick={() => {
            setSelectedOption("smManagers");
          }}
        >
          SM Manager
        </p>
        <p
          onClick={() => {
            setSelectedOption("items");
          }}
        >
          Item Ordered
        </p>
        <p
          onClick={() => {
            setSelectedOption("itemsCost");
          }}
        >
          Item Cost
        </p>
        <p
          onClick={() => {
            setSelectedOption("cutters");
          }}
        >
          Cutter
        </p>
        <p
          onClick={() => {
            setSelectedOption("stitchers");
          }}
        >
          Stitcher
        </p>
        <p
          onClick={() => {
            setSelectedOption("cutCost");
          }}
        >
          Cut Cost
        </p>
        <p
          onClick={() => {
            setSelectedOption("tailoringFee");
          }}
        >
          Tailoring Fee
        </p>
      </div>
      <div className="Users">
        <div className="user-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{selectedOption}</th>
                <th>
                  <span />
                </th>
              </tr>
            </thead>
            <tbody>
              {options
                .filter((option) => option.type === selectedOption)
                .map((option) => (
                  <tr key={option.id}>
                    <td>{option.value}</td>
                    <td>
                      <img
                        src={deleteIcon}
                        alt=""
                        onClick={() => {
                          deleteOption(option.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Options;
