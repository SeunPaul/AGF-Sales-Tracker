import React, { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
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

function Overview() {
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [orders, setOrders] = useState<OrdersType>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const tableRef = useRef(null);

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
        <DownloadTableExcel
          filename="orders table"
          sheet="orders"
          currentTableRef={tableRef.current}
        >
          <button> Export excel </button>
        </DownloadTableExcel>
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
        <table ref={tableRef}>
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
