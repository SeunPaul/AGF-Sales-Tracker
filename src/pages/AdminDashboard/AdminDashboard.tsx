import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Overview from "../../components/Overview/Overview";
import notify from "../../helpers/notify";
import "./AdminDashboard.css";

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

function AdminDashboard({ user, setLoggedIn, setUser }: OrderPropType) {
  const [page, setPage] = useState("Overview");

  const navigate = useNavigate();

  const onLogout = () => {
    APIService.logout()
      .then((res) => {
        notify("success", res.message);
        setLoggedIn(false);
        setUser({});
        navigate("/admin");
      })
      .catch(() => {
        notify("error", "error");
      });
  };

  const displayPage = () => {
    switch (page) {
      case "Overview":
        return <Overview />;
      case "Users":
        return <p>Users</p>;
      case "Add User":
        return <p>Add User</p>;
      default:
        return <p>No page to display</p>;
    }
  };

  return (
    <div>
      <div className="public-page-wrapper">
        <div className="AdminDashboard">
          <div className="contact-section2 contact-section">
            <p className="logout" onClick={onLogout}>
              Logout
            </p>
            <div className="order-form-heading">
              <h2>Admin Dashboard</h2>
              <div className="navigators">
                <p
                  className={page === "Overview" ? "selected" : ""}
                  onClick={() => {
                    setPage("Overview");
                  }}
                >
                  Overview
                </p>
                <p
                  className={page === "Users" ? "selected" : ""}
                  onClick={() => {
                    setPage("Users");
                  }}
                >
                  Users
                </p>
                <p
                  className={page === "Add User" ? "selected" : ""}
                  onClick={() => {
                    setPage("Add User");
                  }}
                >
                  Add User
                </p>
              </div>
            </div>
            <div>{displayPage()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
