import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Routes
import customRoutes from "./routes";

// redirect page
import Redirect from "./Redirect";

// scroll
import Scroll from "../components/ScrollToTop/ScrollToTop";

type RouterPropType = {
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
  user?: {
    role?: string;
    username?: string;
  };
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

function Router({ loggedIn, setLoggedIn, user, setUser }: RouterPropType) {
  return (
    <BrowserRouter>
      <Scroll />
      <Toaster />
      <Routes>
        {customRoutes.map((route) => {
          if (
            route.meta.protectedRoute &&
            (user?.role === "admin" || user?.role === "super admin") &&
            loggedIn
          ) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <route.component
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    user={user}
                    setUser={setUser}
                  />
                }
              />
            );
          }

          if (
            route.meta.protectedRoute &&
            user?.role === "user" &&
            route.meta.role === "user" &&
            loggedIn
          ) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <route.component
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    user={user}
                    setUser={setUser}
                  />
                }
              />
            );
          }

          if (route.meta.protectedRoute && !loggedIn) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Redirect redirectUrl={route.meta.redirectUrl} />}
              />
            );
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <route.component
                  redirectUrl={route.meta.redirectUrl}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  user={user}
                  setUser={setUser}
                />
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
