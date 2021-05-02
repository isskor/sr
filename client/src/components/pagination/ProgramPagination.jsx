import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const ProgramPagination = ({ page, totalpages, setPage }) => {
  const history = useHistory();

  const handleNextPrev = (direction) => {
    if (direction === 'prev') {
      setPage(page - 1);
      history.push(`/programs/${page - 1}`);
    }
    if (direction === 'next') {
      setPage(page + 1);
      history.push(`/programs/${page + 1}`);
    }
  };
  return (
    <StyledPagination>
      <button onClick={() => handleNextPrev('prev')} disabled={page === 1}>
        <FontAwesomeIcon icon={faAngleLeft} size='2x' />
      </button>
      <span>{page}</span>
      <button
        onClick={() => handleNextPrev('next')}
        disabled={page === totalpages}
      >
        <FontAwesomeIcon icon={faAngleRight} size='2x' />
      </button>
    </StyledPagination>
  );
};

export default ProgramPagination;
const StyledPagination = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  button {
    padding: 1em;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 30px rgba(92, 92, 92, 0.1);
  }
  span {
    font-size: 1.4rem;
  }
`;
