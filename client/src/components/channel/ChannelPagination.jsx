import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const ChannelPagination = ({ page, totalpages, pagination, callback }) => {
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
        prev
      </button>
      <span>{page}</span>
      <button
        onClick={() => handleNextPrev('nextpage')}
        disabled={page === totalpages}
      >
        next
      </button>
    </StyledPagination>
  );
};

export default ChannelPagination;
const StyledPagination = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  button {
    padding: 1em;
    border-radius: 3rem;
    font-size: 0.9rem;
  }
`;
