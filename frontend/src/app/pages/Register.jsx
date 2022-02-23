/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

//import toast notifications

import {toast} from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //destructure formData

  const { name, email, password, password2 } = formData;

  //onChange event

  const onChange = (event) => {
    setFormData((prevState) => ({
      //spread prevState
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
      event.preventDefault()

      if (password !== password2) {
          toast.error('passwords dont match!')

      }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUserAlt /> Register
        </h1>

        <p>Please create account</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              name="name"
              onChange={onChange}
              placeholder="enter name"
              required
            />
          </div>

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
            <input
              type="password2"
              className="form-control"
              id="password2"
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="Confirm/Retype password"
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

export default Register;
