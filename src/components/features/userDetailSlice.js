import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import client from '../ApolloClient'
import { useSelector, useDispatch } from 'react-redux';

const GET_USERS_QUERY = gql`
  query {
    getUsers {
      id
      name
      email
      role
    }
  }
`;

export const getUsers = createAsyncThunk(
  "getUsers",

  async (args, { rejectWithValue }) => {
    const response = await client.query({
      query: GET_USERS_QUERY
    });

    try {
      const result = await response.data.getUsers;
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const UPDATE_USER_ROLE_MUTATION = gql`
  mutation UpdateUserRole($id:ID!, $role: String!) {
    updateUserRole(data: {id:$id role: $role }) {
      id
      role
    }
  }
`;

export const updateUserRole = createAsyncThunk(
  "updateUserRole",

  async (updateData, { rejectWithValue }) => {

    const response = await client.mutate({
      mutation: UPDATE_USER_ROLE_MUTATION,
    //   variables: { id, role },
    })

    try {
      const result = await response.data.updateUserRole;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const DELETE_USER_DATA = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const deleteUser = createAsyncThunk(
  "deleteUser",

  async (id, { rejectWithValue }) => {
    const response = await client.mutate({
      mutation: DELETE_USER_DATA,
      variables: { id },

    });
    try {
      const result = await response.data.deleteUser;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  });




export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
      users: [],
      loading: false,
      error: null,
    },
  
    extraReducers: {

        [getUsers.pending]: (state) => {
            state.loading = true;
          },
          [getUsers.fulfilled]: (state, action) => {
      
            state.loading = false;
            state.users = action.payload;
          },
          [getUsers.rejected]: (state, action) => {
      
            state.loading = false;
            state.error = action.payload;
          },
          [deleteUser.pending]: (state) => {
            console.log("pending")
      
            state.loading = true;
          },
          [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            console.log("id", id)
            if (id) {
              state.users = state.users.filter((ele) => ele.id !== id);
            }
          },
          [deleteUser.rejected]: (state, action) => {
            console.log("rejected")
      
            state.loading = false;
            state.error = action.payload;
          },
    }
});

export default userDetail.reducer;