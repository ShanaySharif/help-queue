import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          formVisibleOnPage: false
        };
      }
      handleClick = () => {
        this.setState(pervState => ({
          formVisibleOnPage: !pervState.formVisibileOnPage
        }));
      }

  render(){
    let currentlyVisibleState = null;
    let addTicketButton = null;;
    if (this.state.formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm />
        // buttonText = "Return to Ticket List";
    } else {
        currentlyVisibleState = <TicketList />
        addTicketButton = <button onClick={this.handleClick}>add ticket </button>
        addTicketButton = <button onClick={this.handleClick}>add ticket </button>
        addTicketButton = <button onClick={this.handleClick}>add ticket </button>
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {addTicketButton}
      </React.Fragment>
    );
  }

}

export default TicketControl;
