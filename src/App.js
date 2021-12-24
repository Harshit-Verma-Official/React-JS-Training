import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { getAxiosInstance } from "./axios";
import PaginatedTable from "./components/Table/PaginatedTable";
import store from "./store";
import * as actions from "./actionTypes";

function App() {
  // States
  const [rows, setRows] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  // States

  // Methods
  const createData = (roll, name, email) => {
    return { name, roll, email };
  };
  // Methods

  // Fetch Data
  useEffect(() => {
    const instance = getAxiosInstance("http://dummy.restapiexample.com/api/v1");

    instance
      .get("/employees")
      .then((response) => {
        store.dispatch({
          type: actions.SET_DATA,
          payload: {
            rows: response.data.data,
          },
        });
        setShowLoading(false);
        setShowError(false);
      })
      .catch((error) => {
        store.dispatch({
          type: actions.SET_DATA,
          payload: {
            rows: [],
          },
        });
        setShowLoading(false);
        setShowError(true);
      });
  }, []);
  // Fetch Data

  store.subscribe(() => {
    let data = [];
    store
      .getState()
      .rows.forEach((row) =>
        data.push(
          createData(
            row.id,
            row.employee_name,
            `${row.employee_name}@gmail.com`
          )
        )
      );
    setRows(data);
  });

  return (
    <div className="App">
      <PaginatedTable rows={rows} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        message="Something went wrong. Refresh the page!"
      />
    </div>
  );
}

export default App;
