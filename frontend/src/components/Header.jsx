/* eslint-disable no-unused-vars */
import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/Auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {

    //dispatch logout action
    dispatch(logout())
    //dispatch reset action
    dispatch(reset())
    // navigate to home
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>

      <ul>

        {/* //is user logged in show login register else empty */}
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUserAlt /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
