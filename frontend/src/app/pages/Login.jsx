/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

//import toast notifications

import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //destructure formData

  const { email, password } = formData;

  //onChange event

  const onChange = (event) => {
    setFormData((prevState) => ({
      //spread prevState
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // if (password !== password2) {
    //   toast.error("passwords dont match!");
    // }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Register
        </h1>

        <p>Please log in to get some support</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="enter email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="enter password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
