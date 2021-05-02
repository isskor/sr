import styled from 'styled-components';

export const SSSTabContent = styled.div`
  background: rgba(255, 255, 255, 0.65);
  width: 100%;
  margin: 0 auto;
  border-radius: 0.25rem;
  box-shadow: 0 0 20px rgba(78, 78, 78, 0.3);
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 10rem;
  }
  @media (min-width: 992px) {
    padding: 1rem 2rem;
    overflow: auto;
  }
  @media (min-width: 1400px) {
    padding: 1rem 5rem;
    overflow: auto;
  }
`;

export const SSSInfo = styled.div`
  margin-bottom: 3rem;

  h2 {
    padding: 1rem 0;
  }

  a {
    color: black;
  }

  .desc {
    padding: 1rem 0;
  }
  img {
    width: 100%;
    max-width: 300px;
    display: block;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;
    gap: 2rem;
    .left {
      /* order: 1; */
      flex: 40%;
      background: rgba(255, 255, 255, 0.65);
      width: 100%;
      margin: 0 auto;
      border-radius: 0.25rem;
      box-shadow: 0 0 20px rgba(78, 78, 78, 0.3);
      padding: 1rem;
    }
    .right {
      flex: 40%;
    }
  }
  @media (min-width: 992px) {
    flex-direction: column;
    gap: 0;
    .left {
      /* order: 1; */
      flex: 40%;
      background: transparent;
      width: 100%;
      border-radius: 0.25rem;
      box-shadow: none;
    }
  }
`;

export const SSSBtnCtn = styled.div`
  text-align: center;
  color: ${(props) => '#' + props.color};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem auto;
  max-width: 300px;
  button {
    padding: 1em 3em;
    border: none;
    margin-left: auto;
    background: ${(props) => (props.color ? '#' + props.color : '#da9efd')};
    color: white;
    border-radius: 3em;
  }
`;

export const SSSWrapper = styled.div`
  padding: 1rem;

  p {
    padding: 0.5rem 0;
  }
  > button,
  .channel_nav button {
    border: none;
    outline: none;
    padding: 1em;
    background: ${(props) => '#' + props.color};
    cursor: pointer;
  }

  .date {
    text-align: center;
    input {
      font-size: 1rem;
      padding: 1rem;
    }
  }
  .right_now {
    h4 {
      padding-top: 1rem;
    }
  }

  @media (min-width: 992px) {
    display: flex;
    padding: 5rem;
    gap: 5rem;
    .info {
      max-width: 800px;
      flex: 50%;
    }
    .content {
      flex: 50%;
    }
  }
`;
