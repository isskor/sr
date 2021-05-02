import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout, selectUser } from '../../slices/user/userSlice';

const LargeNav = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <StyledLGNav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/channels'>Channels</Link>
        </li>
        <li>
          <Link to='/programs'>Programs</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}

        {user && localStorage.getItem('token') && (
          <>
            <li>
              <Link to='/favorite'>My Favorites</Link>
            </li>
            <li>
              <Link to='/userschedule'>My Schedule</Link>
            </li>
            <li onClick={handleLogout} className='logout'>
              <Link to='/'>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </StyledLGNav>
  );
};

export default LargeNav;

const StyledLGNav = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 1rem;
    ul {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
      a {
        text-decoration: none;
        color: #111111;
        font-size: 1rem;
      }
    }
  }
  @media (min-width: 992px) {
    ul {
      gap: 3rem;
      a {
        font-size: 1.2rem;
      }
    }
  }
`;
