import { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
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

  const tableRef = useRef(null);

  useEffect(() => {
    APIService.getOrders()
      .then((res) => {
        if (res.success) {
          const { data } = res;

          setOrders(data.orders);
          console.log(data);
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
      </div>
      <div className="sn-wrapper">
        <p>s/n</p>
        {orders.map((order, i) => (
          <>
            <p key={order.id}>{i + 1}</p>
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
          </>
        ))}
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
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <>
                <tr key={order.id}>
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
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Overview;
