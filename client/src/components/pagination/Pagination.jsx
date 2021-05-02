import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ page, totalpages, pagination, callback }) => {
  const dispatch = useDispatch();
  const handleNextPrev = (direction) => {
    dispatch(callback(pagination[direction]));
  };
  return (
    <StyledPagination>
      <button
        onClick={() => handleNextPrev('previouspage')}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} size='2x' />
        {/* prev */}
      </button>
      <span>{page}</span>
      <button
        onClick={() => handleNextPrev('nextpage')}
        disabled={page === totalpages}
      >
        <FontAwesomeIcon icon={faAngleRight} size='2x' />
        {/* next */}
      </button>
    </StyledPagination>
  );
};

export default Pagination;
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
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 30px rgba(92, 92, 92, 0.1);
    cursor: pointer;
  }
  span {
    font-size: 1.4rem;
  }
`;
