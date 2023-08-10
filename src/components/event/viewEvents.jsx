// // UserList.js
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from "react-router-dom";
// import { getEvents } from "../features/eventDetailSlice";
// import { deleteEvent } from "../features/eventDetailSlice";
// import { bookEvent } from "../features/eventDetailSlice";

// import Background from '../Background';
// import themeImage from '../images/theme.jpeg'

// const ViewEvents = () => {
//   const dispatch = useDispatch();
//   const { events, loading, error } = useSelector((state) => state.event);

//   console.log("events",events)
//   const role = useSelector((state) => state.auth.role);
//   const [searchTerm, setSearchTerm] = useState('');

//   const myStyle = {
//     backgroundImage: `url(${themeImage})`,
//   };

//   const filteredEvents = events.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     dispatch(getEvents());
//   }, []);

//   const  user  = useSelector((state) => state.auth.user)

//   const handleBooking   = (eventId,eventName,user) => {   
    
//   const userId = user.id
//    dispatch(bookEvent({userId: user.id, eventId: eventId ,eventName: eventName}));

//    // navigate("/view");
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <div>
//         <div>Event list</div>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by name"
//         />
//         <div>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Description</th>
//                 <th>Location</th>
//                 <th>Price</th>
//                 <th>Date</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEvents && filteredEvents.map((ele, index) =>
//                 <tr key={index}>
//                   <td>
//                     {ele.name}
//                   </td>
//                   <td>
//                     {ele.description}
//                   </td>
//                   <td>
//                     {ele.location}
//                   </td>
//                   <td>
//                     {ele.price}
//                   </td> <td>
//                     {ele.date}
//                   </td>
//                   <td>
//                     {ele.time}
//                   </td>
//                   {role === "organizer" && (
//                     <Link to={`/edit/${ele.id}`} className="card-link">
//                       Edit
//                     </Link>

//                   )}
//                   {role === "organizer" && (

//                     <Link
//                       onClick={() => dispatch(deleteEvent(ele.id))}
//                       className="card-link"
//                     >
//                       Delete
//                     </Link>
//                   )}
//                     <Link
//                       onClick={() => handleBooking(ele.id,ele.name,user)}
//                       className="card-link"
//                     >
//                       Book Event
//                     </Link>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </>
//   );
// };

// export default ViewEvents;


// UserList.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getEvents } from "../features/eventDetailSlice";
import { deleteEvent } from "../features/eventDetailSlice";
import { bookEvent } from "../features/eventDetailSlice";

import { loadStripe } from '@stripe/stripe-js';
import { gql } from '@apollo/client';

import client from '../ApolloClient'

const ViewEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);

  console.log("hari",events);
  const role = useSelector((state) => state.auth.role);
  const [searchTerm, setSearchTerm] = useState('');
  const  user  = useSelector((state) => state.auth.user)

  const filteredEvents = events.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getEvents(dispatch));
  }, []);

  // const handleBooking   = (eventId,eventName,user) => {   
  //      dispatch(bookEvent({userId: user.id, eventId: eventId ,eventName: eventName}));
  //  // navigate("/view");
  // };

  //added

  const HANDLE_EVENT_DATA = gql`
  mutation Payment($eventId: String!) {
    payment(eventId: $eventId) 
  }
`;
const handleBookEvent = async (eventId) => {
  const stripePromise = loadStripe('pk_test_51MU1rqSIP21hzYpYCvfOZBZcapleE2hQyBTDyE9a4I0kn4npR5I9krQkZGIrojGCUPOrlGEiST8XcduJSMkeZC6m00YVZgQxq7');

          const stripe = await stripePromise;

          const response = await client.mutate({
            mutation: HANDLE_EVENT_DATA,
            variables: { eventId },
      
          });
          try {

            console.log("response",response.data.payment)

      // const data = await response.json();

      // Redirect to Stripe Checkout page to complete the payment
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.payment,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
};
 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <div>Event list</div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Price</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents && filteredEvents.map((ele, index) =>
                <tr key={index}>
                  <td>
                    {ele.name}
                  </td>
                  <td>
                    {ele.description}
                  </td>
                  <td>
                    {ele.location}
                  </td>
                  <td>
                    {ele.price}
                  </td> <td>
                    {ele.date}
                  </td>
                  <td>
                    {ele.time}
                  </td>
                  {role === "organizer" && (
                    <Link to={`/edit/${ele.id}`} className="card-link">
                      Edit
                    </Link>

                  )}
                  {role === "organizer" && (

                    <Link
                      onClick={() => dispatch(deleteEvent(ele.id))}
                      className="card-link"
                    >
                      Delete
                    </Link>
                  )}
                    {/* <Link
                      onClick={() => handleBooking(ele.id,ele.name,user)}
                      className="card-link"
                    >
                      Book Event
                    </Link> */}
                                      {role === "attendees" && (

                      <button onClick={() => handleBookEvent(ele.id)}>Book Now</button>
                      )}

                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};

export default ViewEvents;







