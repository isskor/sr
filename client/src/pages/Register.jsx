import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../slices/user/userAPI';
import { StyledLoginContainer } from '../styles/container';
import { StyledLoginForm } from '../styles/form';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = validatePassword(password);
    if (validate) {
      userRegister({ email, password })
        .then((res) => {
          if (res.data.error) {
            setError(res.data.error);
            return;
          } else {
            setError([]);
            history.push('/login');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(error);
  const validatePassword = (p) => {
    let errors = [];
    if (p.length < 8) {
      errors.push('Your password must be at least 8 characters');
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push('Your password must contain at least one letter.');
    }
    if (p.search(/[A-Z]/) < 0) {
      errors.push('Your password must contain at least one uppercase letter.');
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push('Your password must contain at least one digit.');
    }
    if (p !== password2) {
      errors.push('Your passwords do not match');
    }
    if (errors.length > 0) {
      setError(errors);
      return false;
    }
    setError([]);
    return true;
  };
  return (
    <StyledLoginContainer>
      <StyledLoginForm onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        <label htmlFor='password'>Confirm Password</label>
        <input
          type='password'
          name='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type='submit' disabled={!email || !password}>
          Login
        </button>
        <div>{error && error.map((e, i) => <p key={i}>{e}</p>)}</div>
      </StyledLoginForm>
    </StyledLoginContainer>
  );
};

export default Register;
