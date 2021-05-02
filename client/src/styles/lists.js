import styled from 'styled-components';

export const SSSList = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    list-style: none;
    gap: 1rem;
    justify-content: center;
  }
  > li {
    flex-basis: 100%;
  }
  @media (min-width: 576px) {
    ul {
      gap: 2rem;
    }
    /* li {
      width: 100px;
    } */
  }
`;
