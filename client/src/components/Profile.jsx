import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ONE_USER } from '../utils/queries.js';
import { DELETE_EVENT } from '../utils/mutations.js';
import Auth from '../utils/auth';
import EventForm from './EventForm.jsx';

function Profile() {
  const _id = Auth.getProfile().data._id;

  const [showForm, setShowForm] = useState(false);

  const [deleteEvent] = useMutation(DELETE_EVENT);

  async function handleDeleteEvent(_id) {
    const { data } = await deleteEvent({
      variables: { _id },
    });

    // Manually refetch the user data after deleting the event
    await refetch();

    console.log(data);
  }

  // Use the GET_ONE_USER query with variables to fetch the user's data
  const { loading, error, data, refetch } = useQuery(GET_ONE_USER, {
    variables: { _id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Destructure the user object from the data
  const { user } = data;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Events:</h2>
      <h5>
        {user.events.map((event) => (
          <p key={event._id}>
            <p>Title: {event.title}</p>
            <p>Description: {event.description}</p>
            <p>Date: {new Date(parseInt(event.date)).toLocaleDateString()}</p>
            <p>Cost: {event.cost}</p>
            <p>Location: {event.location}</p>

            <button value={event._id} onClick={(e) => handleDeleteEvent(e.target.value)}>Delete Event</button>
            {/* Add more event details here if needed. Use the EventCard as a reference for additional information */}
          </p>
        ))}
      </h5>

      <h3>Add Event</h3>

      <EventForm showForm={showForm} setShowForm={setShowForm} />

      {/* FIND A WAY TO RERENDER WHEN DELETE OR ADD! So that they show up! */}
    </div>
  );
}

export default Profile;
