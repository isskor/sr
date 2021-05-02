import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { logout, selectUser } from '../../slices/user/userSlice';

const SideNav = ({ openSide, setOpenSide }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <S_SIDENAV
      className={openSide ? '' : 'reverse'}
      onClick={() => setOpenSide(false)}
    >
      <ul>
        <li onClick={() => setOpenSide(false)}>
          <Link to='/'>Home</Link>
        </li>
        <li onClick={() => setOpenSide(false)}>
          <Link to='/channels'>Channels</Link>
        </li>
        <li onClick={() => setOpenSide(false)}>
          <Link to='/programs'>Programs</Link>
        </li>
        {!user && (
          <>
            <li onClick={() => setOpenSide(false)}>
              <Link to='/login'>Login</Link>
            </li>
            <li onClick={() => setOpenSide(false)}>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}

        {user && localStorage.getItem('token') && (
          <>
            <li onClick={() => setOpenSide(false)}>
              <Link to='/favorite'>My Favorites</Link>
            </li>
            <li onClick={() => setOpenSide(false)}>
              <Link to='/userschedule'>My Schedule</Link>
            </li>
            <li
              onClick={() => {
                setOpenSide(false);
                handleLogout();
              }}
              className='logout'
            >
              <Link to='/'>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </S_SIDENAV>
  );
};

export default SideNav;
const fade = keyframes`
  from {
    transform: translateX(-100%)
  }
  to {
    margin-right: 0;
  }
`;

const S_SIDENAV = styled.nav`
  flex: 100%;
  height: calc(100vh - 54px);
  animation: ${fade} 0.3s;
  z-index: 500;
  ul {
    background-color: #fbfbfb;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    text-align: center;
    height: 100%;
    li {
      width: 100%;
    }
    a {
      color: #111111;
      text-decoration: none;
      font-weight: 600;
      display: block;
      width: 100%;
      padding: 2rem;
    }
    .logout {
      margin-top: auto;
      justify-self: flex-end;
    }
  }
  @media (min-width: 768px) {
    ul {
      width: 30%;
    }
  }
`;
