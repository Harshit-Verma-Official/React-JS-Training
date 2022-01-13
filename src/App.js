import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App({ authToken }) {
  return (
    <div className="App">
      {authToken ? (
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken,
  };
};

export default connect(mapStateToProps, null)(App);
