import styled from 'styled-components';

export const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.65);
  width: 100%;
  margin: 5rem auto;
  border-radius: 0.25rem;
  box-shadow: 0 0 20px rgba(78, 78, 78, 0.3);
  padding: 2rem;
  max-width: 600px;
  h1 {
    text-align: center;
    padding: 2rem;
  }
  label {
    font-size: 1.1.rem;
    padding-bottom: 1rem;
  }

  input {
    padding: 1rem;
    font-size: 1rem;
    border: none;
    background: transparent;
    border-bottom: 1px solid black;
    margin-bottom: 2rem;
  }

  button {
    padding: 1em;
    font-size: 1rem;
    display: block;
    width: 100%;
    margin: 0 auto;
    border: none;
    outline: none;
    background-color: rgba(240, 240, 240, 0.5);
    box-shadow: 0 0 20px rgba(128, 128, 128, 0.3);
  }
`;
