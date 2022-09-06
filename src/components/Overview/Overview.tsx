import React, { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import deleteIcon from "../../assets/icons/delete.svg";
import notify from "../../helpers/notify";
import "./Overview.css";

// api service
import APIService from "../../utils/apiServices";
type OrdersType =
  | {
      id: string;
      created_at: string;
      customer_name: string;
      country: string;
      state: string;
      city: string;
      address: string;
      phone_number: string;
      email: string;
      brand: string;
      production_manager: string;
      sm_manager: string;
      uploader?: string;
      items: {
        item_ordered: string;
        item_cost: number;
        cutter: string;
        stitcher: string;
        cut_cost: number;
        tailoring_fee: number;
      }[];
    }[]
  | [];

type FormattedDataType = {
  Date: string;
  "Customer Name": string;
  Country: string;
  State: string;
  City: string;
  Address: string;
  Tell: string;
  Email: string;
  Brand: string;
  "Prod Manager": string;
  "SM Manager": string;
  "Item Ordered": string;
  "Item Cost": number;
  Cutter: string;
  Stitcher: string;
  "Cut Cost": number;
  "Tailoring Fee": number;
  Uploader?: string;
}[];

function Overview() {
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [orders, setOrders] = useState<OrdersType>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const setDate = (type: string, value: string) => {
    if (type === "start") {
      if (value < endDate || endDate === "") {
        setStartDate(value);
      } else {
        setStartDate(startDate);
      }
    }
    if (type === "end") {
      if (value > startDate || startDate === "") {
        setEndDate(value);
      } else {
        setEndDate(endDate);
      }
    }
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  const onDeleteRecord = (orderId: string) => {
    if (
      window.confirm(
        "You are about to delte this record. This action can not be reversed"
      )
    ) {
      APIService.deleteOrder({ orderId })
        .then((res) => {
          if (res.success) {
            notify("success", res.message);
            window.location.reload();
          } else {
            notify("error", res.message);
          }
        })
        .catch(() => {
          notify("error", "connection error");
        });
    }
  };

  const onDownloadExcel = () => {
    // filter the ones in date range
    const filteredOrders = orders.filter(
      (order) =>
        (startDate === "" ||
          new Date(order.created_at).toLocaleDateString() >=
            new Date(startDate).toLocaleDateString()) &&
        (endDate === "" ||
          new Date(order.created_at).toLocaleDateString() <=
            new Date(endDate).toLocaleDateString())
    );

    let formattedData: FormattedDataType = [];

    filteredOrders.forEach((order) => {
      formattedData = formattedData.concat([
        {
          Date: new Date(order.created_at).toLocaleDateString(),
          "Customer Name": order.customer_name,
          Country: order.country,
          State: order.state,
          City: order.city,
          Address: order.address,
          Tell: order.phone_number,
          Email: order.email,
          Brand: order.brand,
          "Prod Manager": order.production_manager,
          "SM Manager": order.sm_manager,
          "Item Ordered": order.items[0].item_ordered,
          "Item Cost": order.items[0].item_cost,
          Cutter: order.items[0].cutter,
          Stitcher: order.items[0].stitcher,
          "Cut Cost": order.items[0].cut_cost,
          "Tailoring Fee": order.items[0].tailoring_fee,
          Uploader: order.uploader,
        },
      ]);
      order.items.forEach((item, i) => {
        if (i > 0) {
          formattedData = formattedData.concat([
            {
              Date: "",
              "Customer Name": "",
              Country: "",
              State: "",
              City: "",
              Address: "",
              Tell: "",
              Email: "",
              Brand: "",
              "Prod Manager": "",
              "SM Manager": "",
              "Item Ordered": item.item_ordered,
              "Item Cost": item.item_cost,
              Cutter: item.cutter,
              Stitcher: item.stitcher,
              "Cut Cost": item.cut_cost,
              "Tailoring Fee": item.tailoring_fee,
              Uploader: "",
            },
          ]);
        }
      });
    });

    const wb = utils.book_new();
    const ws = utils.json_to_sheet(formattedData);

    utils.book_append_sheet(wb, ws, "Orders");

    writeFile(wb, "Orders.xlsx");
  };

  useEffect(() => {
    APIService.getOrders()
      .then((res) => {
        if (res.success) {
          const { data } = res;

          setOrders(data.orders);
          setOverviewLoading(false);
        } else {
          notify("error", res.message);
          setOverviewLoading(false);
        }
      })
      .catch(() => {
        notify("error", "connection error");
        setOverviewLoading(false);
      });
  }, []);

  return overviewLoading ? (
    <p>Overview loading...</p>
  ) : (
    <div className="Overview">
      <div className="download-excel">
        <button type="button" onClick={onDownloadExcel}>
          Export excel
        </button>
        <div className="date-filter">
          <div>
            <label>Start</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setDate("start", e.target.value);
              }}
            />
          </div>
          <div>
            <label>End</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setDate("end", e.target.value);
              }}
            />
          </div>
          <p onClick={clearDateFilter}>Clear</p>
        </div>
      </div>
      <div className="sn-wrapper">
        <p>s/n</p>
        {orders.map(
          (order, i) =>
            (startDate === "" ||
              new Date(order.created_at).toLocaleDateString() >=
                new Date(startDate).toLocaleDateString()) &&
            (endDate === "" ||
              new Date(order.created_at).toLocaleDateString() <=
                new Date(endDate).toLocaleDateString()) && (
              <div key={order.id}>
                <p>{i + 1}</p>
                <ol type="a">
                  {order.items.map(
                    (item, i) =>
                      i > 0 && (
                        <li key={`${order.id}${i}`}>
                          <p />
                        </li>
                      )
                  )}
                </ol>
              </div>
            )
        )}
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Address</th>
              <th>Tel</th>
              <th>Email</th>
              <th>Brand</th>
              <th>Prod Manager</th>
              <th>SM Manager</th>
              <th>Item Ordered</th>
              <th>Item Cost</th>
              <th>Cutter</th>
              <th>Stitcher</th>
              <th>Cut Cost</th>
              <th>Tailoring Fee</th>
              <th>Uploader</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              (order, i) =>
                (startDate === "" ||
                  new Date(order.created_at).toLocaleDateString() >=
                    new Date(startDate).toLocaleDateString()) &&
                (endDate === "" ||
                  new Date(order.created_at).toLocaleDateString() <=
                    new Date(endDate).toLocaleDateString()) && (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>{order.customer_name}</td>
                      <td>{order.country}</td>
                      <td>{order.state}</td>
                      <td>{order.city}</td>
                      <td>{order.address}</td>
                      <td>{order.phone_number}</td>
                      <td>{order.email}</td>
                      <td>{order.brand}</td>
                      <td>{order.production_manager}</td>
                      <td>{order.sm_manager}</td>
                      <td>{order.items[0].item_ordered}</td>
                      <td>{order.items[0].item_cost}</td>
                      <td>{order.items[0].cutter}</td>
                      <td>{order.items[0].stitcher}</td>
                      <td>{order.items[0].cut_cost}</td>
                      <td>{order.items[0].tailoring_fee}</td>
                      <td>{order.uploader}</td>
                      <td>
                        <img
                          src={deleteIcon}
                          alt=""
                          onClick={() => {
                            onDeleteRecord(order.id);
                          }}
                        />
                      </td>
                    </tr>
                    {order.items.map(
                      (item, i) =>
                        i > 0 && (
                          <tr key={`${order.id}${i}`}>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>
                              <span />
                            </td>
                            <td>{item.item_ordered}</td>
                            <td>{item.item_cost}</td>
                            <td>{item.cutter}</td>
                            <td>{item.stitcher}</td>
                            <td>{item.cut_cost}</td>
                            <td>{item.tailoring_fee}</td>
                            <td>
                              <span />
                            </td>
                          </tr>
                        )
                    )}
                  </React.Fragment>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Overview;
