/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {createTicket, reset} from '../../features/tickets/ticketSlice'
import Spinner from "../../components/Spinner";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);

  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.ticket)




  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      if(isError) {
          toast.error(message)
      }

      if (isSuccess) {
          dispatch(reset())
          navigate('/tickets')
      }
  })

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(createTicket({product, description}))
  };

  return (
    <>
      <section className="heading">
        <h1>create new ticket</h1>
        <p>please fill out section</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">customer name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">customer email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook pro">Macbook pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">description of issue</label>
            <textarea
              name="description"
              id="desctiption"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
