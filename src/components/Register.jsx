import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('organizer')

  const isButtonDisabled = name === '' || email === '' || password === '';



  const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!, $role: String!) {
    registerUser(data: { name: $name, email: $email, password: $password, role:$role }) {
      name
    }
  }
`;

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleRegistration = async (e) => {

    e.preventDefault();

    try {

      const { data } = await registerUser({

        variables: { name, email, password, role },

      });

      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (err) {

      console.error(err);
    }


  };

  function changeRole(event) {
    setRole(event.target.value)
  }


  return (
    <div>

      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> <br />
        <select value={role} onChange={changeRole}>
          <option value="organizer">Organizer</option>
          <option value="attendees">Attendees</option>
        </select> <br />
        <button type="submit" disabled={isButtonDisabled}>
          Register
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
