import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./shared/store/root/store";
import { UsersPage } from "./pages/usersPage/components/usersPage/usersPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { UsersAddPage } from "./pages/usersPage/components/usersAddPage/usersAddPage";
import { UsersEditPage } from "./pages/usersPage/components/usersEditPage/usersEditPage";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Switch>
            <Route path={"/add-user"}>
              <UsersAddPage />
            </Route>
            <Route path={"/edit-user/:id"}>
              <UsersEditPage />
            </Route>
            <Route path={"/"}>
              <UsersPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
