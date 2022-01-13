import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { login } from "../../axios/axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    login(formData.username, formData.password);
  };

  console.log(formData);

  return (
    <div className="login_container">
      <div className="form">
        <h1>Login</h1>
        <TextField
          id="outlined-password-input"
          label="Username"
          name="username"
          type="text"
          onChange={handleChange}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
