import { useState } from 'react';
import styled from 'styled-components';
import CategoryFilter from './CategoryFilter';

const CategoryFilterButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledButton onClick={() => setOpen(true)}>
        Filter By Category
      </StyledButton>
      <CategoryFilter open={open} setOpen={setOpen} />
    </>
  );
};

export default CategoryFilterButton;

const StyledButton = styled.button`
  width: 300px;
  display: block;
  padding: 1rem;
  margin: 0 auto;
  border: none;
  outline: none;
  background-color: rgba(240, 240, 240, 0.5);
  box-shadow: 0 0 20px rgba(128, 128, 128, 0.5);
`;
