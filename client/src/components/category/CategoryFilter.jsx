import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectCategories,
  setCurrentCat,
} from '../../slices/categories/categoriesSlice';
import { getPrograms } from '../../slices/programs/programsSlice';
import { useHistory } from 'react-router-dom';

const CategoryFilter = ({ open, setOpen }) => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCategory = (cat) => {
    // dispatch(getPrograms(1, id));
    dispatch(setCurrentCat(cat));
    history.replace('/programs/1');
    setOpen(false);
  };

  if (open)
    return (
      <StyledCategories onClick={() => setOpen(false)}>
        <ul>
          <div className='head'>
            <h2>Categories</h2>
            <p onClick={() => setOpen(false)}>close</p>
          </div>
          {categories?.map((c) => (
            <li key={c.id} onClick={() => handleCategory(c)}>
              {c.name}
            </li>
          ))}
        </ul>
      </StyledCategories>
    );
  return '';
};

export default CategoryFilter;

const StyledCategories = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  .head {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    /* height: 80vh; */
    /* overflow: scroll; */
    margin: 8rem auto;
    background: white;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    list-style: none;

    box-shadow: 0 0 20px rgba(78, 78, 78, 0.3);
    li {
      margin: 0 auto;
      color: black;
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      width: 90%;
    }
  }
`;
