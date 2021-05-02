import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  getCategories,
  selectCurrentCat,
  setCurrentCat,
} from '../slices/categories/categoriesSlice';

import {
  // getNextPrevPrograms,
  getPrograms,
  selectPrograms,
  selectProgramStatus,
} from '../slices/programs/programsSlice';
import { StyledContainer } from '../styles/container';
import { StyledH1 } from '../styles/typography';
import ProgramCard from '../components/cards/ProgramCard';
import CategoryFilterButton from '../components/category/CategoryFilterButton';
import { SSSList } from '../styles/lists';
import Pagination from '../components/pagination/Pagination';
import ProgramPagination from '../components/pagination/ProgramPagination';

const Programs = ({ match }) => {
  const dispatch = useDispatch();
  const { programs, pagination } = useSelector(selectPrograms);
  const status = useSelector(selectProgramStatus);
  const currentCat = useSelector(selectCurrentCat);
  const [page, setPage] = useState(1);
  let totalpages = 1;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(
      getPrograms({ page: match.params.page, categoryId: currentCat?.id })
    );
  }, [dispatch, currentCat, match.params.page]);

  useEffect(() => {
    checkPage();
  }, [pagination]);

  const checkPage = () => {
    if (pagination) {
      setPage(pagination.page);
    }
  };
  if (pagination) totalpages = pagination.totalpages;

  const clearCategory = () => {
    dispatch(setCurrentCat(null));
  };

  return (
    <StyledContainer>
      {status === 'loading' ? (
        <h2>Loading</h2>
      ) : (
        <SSSList>
          <StyledH1>Programs</StyledH1>
          <CategoryFilterButton />
          {currentCat && (
            <StyledClearCatBtn>
              <h4>Filter by: {currentCat.name}</h4>
              <button onClick={clearCategory}>Clear </button>
            </StyledClearCatBtn>
          )}
          <ul>
            {programs?.map((p) => (
              <li key={p.id}>
                <ProgramCard program={p} />
              </li>
            ))}
          </ul>
        </SSSList>
      )}
      <ProgramPagination
        page={page}
        totalpages={totalpages}
        setPage={setPage}
      />
    </StyledContainer>
  );
};

export default Programs;

const StyledClearCatBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  button {
    border: none;
    outline: none;
    background: rgba(196, 147, 236, 0.4);
    padding: 1rem;
    border-radius: 0.25rem;
  }
`;
