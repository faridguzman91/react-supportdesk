/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/Auth/authSlice";
import Spinner from "../../components/Spinner";

//import toast notifications

import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //destructure formData

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  //docs

  //https://redux.js.org/tutorials/fundamentals/part-5-ui-react#dispatching-actions-with-usedispatch

  //   const Header = () => {
  //   const [text, setText] = useState('')
  //   const dispatch = useDispatch()

  //   const handleChange = e => setText(e.target.value)

  //   const handleKeyDown = e => {
  //     const trimmedText = e.target.value.trim()
  //     // If the user pressed the Enter key:
  //     if (e.key === 'Enter' && trimmedText) {
  //       // Dispatch the "todo added" action with this text
  //       dispatch({ type: 'todos/todoAdded', payload: trimmedText })
  //       // And clear out the text input
  //       setText('')
  //     }
  //   }

  //onChange event

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirect to login
    //isSucces true / user filled form true

    //this is not redirecting after register

    if (isSuccess || user) {
      navigate('/');
    }

    //dispatch reset from slice

    dispatch(reset());

    //FIX MEMORY LEAK AFTER  RERENDER
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (event) => {
    setFormData((prevState) => ({
      //spread prevState
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== password2) {
      toast.error("Passwords dont match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      //pass in userdata from register in authSlice
      dispatch(register(userData));
    }
  };

  if(isLoading) {
    return <Spinner />
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
              type="password"
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
