import React, { useEffect,useState } from "react";
import { db, auth } from './firebase.js'


// import { connect } from "react-redux";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import EditTicketForm from "./EditTicketForm";
import TicketDetail from "./TicketDetail";
// import { collection, addDoc } from "firebase/firestore";
import { collection, addDoc,doc,updateDoc, onSnapshot,deleteDoc } from "firebase/firestore";



function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "tickets"), 
      (collectionSnapshot) => { //parameter represents the response from our database
        const tickets = [];
        collectionSnapshot.forEach((doc) => {//calling a QuerySnapshot method
            tickets.push({
              names: doc.data().names, 
              location: doc.data().location, //1.doc accesses the Firestore document, a DocumentSnapshot object.2:data() returns the Firestore document's data into a JavaScript object.3: .names accesses the names key to get its value.
              issue: doc.data().issue, 
              id: doc.id
            });
        });
        setMainTicketList(tickets);
      }, 
      (error) => {
        setError(error.message);

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

  const handleDeletingTicket = async (id) => {
    await deleteDoc(doc(db, "tickets", id));
    setSelectedTicket(null);
  }
  const handleEditClick = () => {
    // new code!
    setEditing(true);
  };
  const handleEditingTicketInList = async (ticketToEdit) => {
    const ticketRef = doc(db, "tickets", ticketToEdit.id);
    await updateDoc(ticketRef, ticketToEdit);
    setEditing(false);
    setSelectedTicket(null);
  }
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
  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
  




  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>
  // new code: editing
} else if (editing) {      
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
      {/* New code below! */}
      {error ? null : <button onClick={handleClick}>{buttonText}</button>}
    </React.Fragment>
  );
}
}
// TicketControl.propTypes = {
//   mainTicketList: PropTypes.object,
// };
// const mapStateToProps = (state) => {
//   return {
//     mainTicketList: state,
//   };
// };
// TicketControl = connect(mapStateToProps)(TicketControl);
export default TicketControl;
