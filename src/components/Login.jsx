import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import GoogleLoginButton from "./GoogleLogin";
import { useNavigate } from 'react-router-dom';
import { loginUser, logout, setAccessToken, setUserObject } from "./features/authSlice";
import { useDispatch } from 'react-redux';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isButtonDisabled = email === '' || password === '';


  const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      Token
      Role
    }

  }
`;

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("email", email);

      const { data } = await login({
        variables: { email, password },

      });

      const tokenString = data.login.Token.split(".");
      const values = Object.values(JSON.parse(atob(tokenString[1])));
      const userObj = values[1]
      const user = JSON.parse(userObj)

      dispatch(loginUser(user.role));
      dispatch(setAccessToken(data.login.Token));
      dispatch(setUserObject(user));

      localStorage.setItem('token', data.login.Token)
      navigate('/about');
    } catch (err) {
      return err
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
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
        <button onClick={handleLogin} disabled={isButtonDisabled}>
          Login
        </button> <br />
        <div className="center-container">
          <GoogleLoginButton />
        </div>
        {error && <p>{"Invalid username or password. Please try again."}</p>}
      </form>
    </>
  );
};

export default LoginForm;
