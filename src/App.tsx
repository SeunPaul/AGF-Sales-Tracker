import { useState, useEffect } from "react";
import Router from "./router/Router";
import "./App.css";
import notify from "./helpers/notify";

// loading component
import RootLoading from "./components/RootLoading/RootLoading";

// api service
import APIService from "./utils/apiServices";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // access token
  const accessToken = sessionStorage.getItem("accessToken") || "";

  // get user profile
  useEffect(() => {
    if (accessToken && !loggedIn) {
      APIService.getProfile()
        .then((res) => {
          if (res.success) {
            const { data } = res;
            setUser(data);
            setLoggedIn(true);
            setLoading(false);
          } else {
            setLoading(false);
            notify("error", res.message);
          }
        })
        .catch(() => {
          setLoading(false);
          notify("error", "An error occured. connection error");
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="App-content">
        {loading ? (
          <RootLoading />
        ) : (
          <Router
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            user={user}
            setUser={setUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
