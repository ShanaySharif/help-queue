import React, { useState } from "react";
import { connect } from "react-redux";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import EditTicketForm from "./EditTicketForm";
import TicketDetail from "./TicketDetail";
import PropTypes from "prop-types";
import db from './firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import db from './../firebase.js'



function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "tickets"), 
      (collectionSnapshot) => {
        // do something with ticket data
      }, 
      (error) => {
        // do something with error
      }
    );

    return () => unSubscribe();
  }, []);


  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      // new code!
      setSelectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleDeletingTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(
      (ticket) => ticket.id !== id
    );
    setMainTicketList(newMainTicketList);
    setSelectedTicket(null);
  };
  const handleEditClick = () => {
    // new code!
    setEditing(true);
  };
  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
      // new code: selectedTicket.id
      .filter((ticket) => ticket.id !== selectedTicket.id)
      .concat(ticketToEdit);
    setMainTicketList(editedMainTicketList);
    // new code!
    setEditing(false);
    setSelectedTicket(null);
  };
  const handleAddingNewTicketToList = async (newTicketData) => {
    await addDoc(collection(db, "tickets"), newTicketData);
    setFormVisibleOnPage(false);

    // setMainTicketList(newMainTicketList);
    // setFormVisibleOnPage(false);
  };
  const handleChangingSelectedTicket = (id) => {
    // new code: updated variable name to 'selection'
    // so there's no clash with the state variable 'selectedTicket'
    const selection = mainTicketList.filter((ticket) => ticket.id === id)[0];
    // new code!
    setSelectedTicket(selection);
  };
  let currentlyVisibleState = null;
  let buttonText = null;
  // new code: editing
  if (editing) {
    currentlyVisibleState = (
      <EditTicketForm
        // new code: selectedTicket
        ticket={selectedTicket}
        onEditTicket={handleEditingTicketInList}
      />
    );
    buttonText = "Return to Ticket List";
    // new code: selectedTicket
  } else if (selectedTicket != null) {
    currentlyVisibleState = (
      <TicketDetail
        // new code: selectedTicket
        ticket={selectedTicket}
        onClickingDelete={handleDeletingTicket}
        onClickingEdit={handleEditClick}
      />
    );
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = (
      <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList} />
    );
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = (
      <TicketList
        onTicketSelection={handleChangingSelectedTicket}
        ticketList={mainTicketList}
      />
    );
    buttonText = "Add Ticket";
  }
  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}
TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    mainTicketList: state,
  };
};
TicketControl = connect(mapStateToProps)(TicketControl);
export default TicketControl;
