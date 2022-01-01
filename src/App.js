import { Snackbar } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import PaginatedTable from "./components/Table/PaginatedTable";
import { fetchCities } from "./redux/actions";

function App({ fetchCities, cities, error }) {
  // Fetch Data
  useEffect(() => {
    fetchCities();
  }, []);
  // Fetch Data

  return (
    <div className="App">
      <PaginatedTable rows={cities} />

      <Snackbar open={error != ""} autoHideDuration={6000} message={error} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCities: () => dispatch(fetchCities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
