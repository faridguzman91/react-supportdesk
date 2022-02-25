/* eslint-disable no-unused-vars */
import React from "react";
// import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login , reset} from "../../features/Auth/authSlice";
import Spinner from "../../components/Spinner";

//import toast notifications

import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //destructure formData

  const { email, password } = formData;

  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  //check for error, if there is (toastify) , clean memory 
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirect to login
    //isSucces true / user filled form true

    //this is not redirecting after register

    if (isSuccess || user) {
      navigate("/");
    }

    //dispatch reset from slice

    dispatch(reset());

    //FIX MEMORY LEAK AFTER  RERENDER
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, user, message, navigate, dispatch]);

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

    const userData = {
        email,
        password
    }

    dispatch(login(userData))

    // if (password !== password2) {
    //   toast.error("passwords dont match!");
    // }
  };

  if (isLoading) {
    return <Spinner />
  }

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
