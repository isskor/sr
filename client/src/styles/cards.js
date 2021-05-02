import styled from 'styled-components';
export const StyledCard = styled.div`
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 14px 14px 50px #e6e6e6, -14px -14px 50px #ffffff;
  width: 300px;
  padding: 1rem;
  .img {
    flex: 20%;
    height: 88px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  p {
    margin: auto 0;
    flex: 40%;
    text-align: center;
    align-self: end;
    color: black;
    font-weight: 700;
    font-size: 1.2rem;
  }

  @media (min-width: 576px) {
    flex-direction: column;
    align-items: center;
    width: 150px;
    min-height: 200px;
    p {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
