import React from 'react'
import {Link} from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";


function Home() {
  return (
    <>
      <section className="heading">
        <h1>where can i help?</h1>
        <p>please choose an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create new ticket
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt/> View ticket
      </Link>
    </>
  );
}

export default Home