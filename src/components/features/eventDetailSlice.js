import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import client from '../ApolloClient'
import { useSelector, useDispatch } from 'react-redux';


const GET_EVENTS_QUERY = gql`
  query {
    getEvents {
      id
      name
      description
      location
      price
      date
      time
    }
  }
`;

export const getEvents = createAsyncThunk(
  "getEvents",

  async (args, { rejectWithValue }) => {
    const response = await client.query({
      query: GET_EVENTS_QUERY
    });

    try {
      const result = await response.data.getEvents;
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($id:ID!, $name: String!, $description: String!, $location: String!, $price: Float!, $date:String!, $time: String!) {
    updateEvent(data: {id:$id name: $name, description: $description, location:$location, price:$price, date:$date, time:$time }) {
      id
      name
      description
      location
      price
      date
      time
    }
  }
`;

export const updateEvent = createAsyncThunk(
  "updateEvent",

  async (updateData, { rejectWithValue }) => {
    const { id, name, description, location, price, date, time } = updateData;

    const response = await client.mutate({
      mutation: UPDATE_EVENT_MUTATION,
      variables: { id, name, description, location, price, date, time },
    })

    try {
      const result = await response.data.updateEvent;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const CREATE_EVENT_DATA = gql`
  mutation CreateEvent($name: String!, $description: String!, $location: String!, $price: Float!, $date:String!, $time: String!) {
    createEvent(data: { name: $name, description: $description, location:$location, price:$price, date:$date, time:$time }) {
      id
      name
      description
      location
      price
      date
      time
    }
  }
`;

export const createEvent = createAsyncThunk(
  "createEvent",

  async (data, { rejectWithValue }) => {
    const { name, description, location, price, date, time } = data;
    const response = await client.mutate({
      mutation: CREATE_EVENT_DATA,
      variables: { name, description, location, price, date, time },

    });
    try {
      const result = await response.data.createEvent;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

const DELETE_EVENT_DATA = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export const deleteEvent = createAsyncThunk(
  "deleteEvent",

  async (id, { rejectWithValue }) => {
    const response = await client.mutate({
      mutation: DELETE_EVENT_DATA,
      variables: { id },

    });
    try {
      const result = await response.data.deleteEvent;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

const BOOK_EVENT_DATA = gql`
  mutation BookEvent($userId: String!, $eventId: String!, $eventName: String!) {
    bookEvent(data: {userId: $userId, eventId: $eventId, eventName:$eventName}) {
      id
      userId
      eventId
    }
  }
`;

// export const bookEvent = createAsyncThunk(
export const bookEvent = createAsyncThunk(
  'bookEvent',
  async ({ userId, eventId, eventName }) => {

    console.log(userId);
    console.log(eventId);
    console.log(eventName);

    const response = await client.mutate({
      mutation: BOOK_EVENT_DATA,
      variables: { userId, eventId, eventName },

    });
    try {
      const result = await response.data.bookEvent;
      return result;
    } catch (error) {
      return error;
    }
  });


export const eventDetail = createSlice({
  name: "eventDetail",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [createEvent.pending]: (state) => {
      state.loading = true;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.events.push(action.payload);
    },
    [createEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getEvents.pending]: (state) => {
      state.loading = true;
    },
    [getEvents.fulfilled]: (state, action) => {

      state.loading = false;
      state.events = action.payload;
    },
    [getEvents.rejected]: (state, action) => {

      state.loading = false;
      state.error = action.payload;
    },

    [updateEvent.pending]: (state) => {

      state.loading = true;
    },
    [updateEvent.fulfilled]: (state, action) => {

      state.loading = false;
      state.events = state.events.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateEvent.rejected]: (state, action) => {

      state.loading = false;
    },
    [deleteEvent.pending]: (state) => {
      state.loading = true;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.events = state.events.filter((ele) => ele.id !== id);
      }
    },
    [deleteEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [bookEvent.pending]: (state) => {
      state.loading = true;
    },
    [bookEvent.fulfilled]: (state, action) => {
      state.loading = false;
      // state.events.push(action.payload);
    },
    [bookEvent.rejected]: (state, action) => {
      state.loading = false;
    },

  },
});

export default eventDetail.reducer;

