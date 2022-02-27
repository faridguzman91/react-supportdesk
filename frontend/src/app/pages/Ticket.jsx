import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTicket, reset, closeTicket } from "../../features/tickets/ticketSlice";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const params = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const { ticketId } = params;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something is wrong</h3>;
  }

  //close ticket
  const onTicketClose = () => {
      dispatch(closeTicket(ticket))
      toast.success('Ticket Closed')
      navigate('/tickets')
  };

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            Ticket Status
          </span>
        </h2>

        <h3>
          Date submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>

        <h3>
            Product: {ticket.product}
        </h3>

        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        {/*notes */}

      </header>

      {ticket.status !== 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
      )}
    </div>
  );
}

export default Ticket;
