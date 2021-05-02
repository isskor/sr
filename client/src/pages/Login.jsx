import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/user/userSlice';
import { StyledLoginContainer } from '../styles/container';
import { StyledLoginForm } from '../styles/form';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <StyledLoginContainer>
      <StyledLoginForm onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' disabled={!email || !password}>
          Login
        </button>
      </StyledLoginForm>
    </StyledLoginContainer>
  );
};

export default Login;
