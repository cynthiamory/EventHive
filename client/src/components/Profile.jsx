import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ONE_USER } from '../utils/queries.js'; 
import Auth from '../utils/auth';

function Profile() {
  // Get the user's _id from the Auth.loggedIn() method
  const _id = Auth.getProfile().data._id

  // Use the GET_ONE_USER query with variables to fetch the user's data
  const { loading, error, data } = useQuery(GET_ONE_USER, {
    variables: { _id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // comment out the console.log(data) line once you know the query is working
  const user = data.user;

  console.log(data);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Events:</h2>
      <ul>
        {user.events.map(event => (
          <li key={event._id}>
            <p>Title: {event.title}</p>
            <p>Description: {event.description}</p>

            {/* This is a comment indicating that more event details can be added here */}
            {/* For example, you can include the event date, location, and other relevant info */}
            {/* You can also add links to each event for further interaction */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
