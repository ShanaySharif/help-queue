import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          formVisibleOnPage: false,
          mainTicketList: []
          // selectedTicket: null
        };
        this.handleClick = this.handleClick.bind(this); //new code here
    }
       
      handleClick = () => {
        this.setState(pervState => ({
          formVisibleOnPage: !pervState.formVisibileOnPage
        }));
      }

      render() {
        let currentlyVisibleState = null;
        let buttonText = null;
      
        // Determine which component to display based on formVisibleOnPage
        if (this.state.formVisibleOnPage) {
          currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
          buttonText = "Return to Ticket List";
        } else {
          currentlyVisibleState = <TicketList ticketlist={this.state.mainTicketList} />;
          buttonText = "Add Ticket"; 
        }
      
        // Render the components and the button
      return (
          <React.Fragment>
            {currentlyVisibleState}
            <button onClick={this.handleClick}>{buttonText}</button>
          </React.Fragment>
        );
      }
    handleAddingNewTicketToList = (newTicket) => {
      const newMainTicketList = this.state.mainTicketList.concat(newTicket);
      this.setState({mainTicketList:newMainTicketList, formVisibleOnPage: false });
    }
  }
export default TicketControl;
