// import React from "react";
// import Ticket from "./Ticket";
// import PropTypes from "prop-types";

// function TicketList(props){

//   return (
//     <React.Fragment>
//       <hr/>
//       {props.ticketList.map((ticket) =>
//         <Ticket 
//           whenTicketClicked={props.onTicketSelection}
//           names={ticket.names}
//           location={ticket.location}
//           // new prop!
//           formattedWaitTime={ticket.formattedWaitTime}
//           issue={ticket.issue}
//           id={ticket.id}
//           key={ticket.id}/>
//       )}
//     </React.Fragment>
//   );
// }

// TicketList.propTypes = {
//   ticketList: PropTypes.array,
//   onTicketSelection: PropTypes.func
// };

// export default TicketList;

import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import styled from 'styled-components';

const StyledTicketList = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

function TicketList(props) {
  return (
    <StyledTicketList>
      <h2>Current Tickets</h2>
      <hr />
      {props.ticketList.map((ticket) => (
        <Ticket
          whenTicketClicked={props.onTicketSelection}
          names={ticket.names}
          location={ticket.location}
          formattedWaitTime={ticket.formattedWaitTime}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}
        />
      ))}
    </StyledTicketList>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func,
};

export default TicketList;