import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import NewTicket from "./app/pages/NewTicket";
import Tickets from "./app/pages/Tickets";
import Ticket from "./app/pages/Ticket";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/new-ticket" element={<PrivateRoutes />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>

            <Route path="/tickets" element={<PrivateRoutes />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>

            <Route path="/ticket/:ticketId" element={<PrivateRoutes />}>
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>


          </Routes>
        </div>
      </Router>
      {/* //add toast notifications everywhere in the app */}
      <ToastContainer />
    </>
  );
}

export default App;
