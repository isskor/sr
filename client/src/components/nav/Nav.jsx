import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SideNav from './SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import LargeNav from './LargeNav';
import logo from '../../assets/images/Untitled-6.png';

const Nav = () => {
  const [openSide, setOpenSide] = useState(false);
  const history = useHistory();

  return (
    <>
      <S_NAV>
        <div className='toggler' onClick={() => setOpenSide(!openSide)}>
          {openSide ? (
            <FontAwesomeIcon icon={faTimes} size='2x' color='gray' />
          ) : (
            <FontAwesomeIcon icon={faBars} size='2x' color='gray' />
          )}
        </div>
        <div className='logo' onClick={() => history.push('/')}>
          <img src={logo} alt='' />
        </div>
        <LargeNav />
        {openSide && <SideNav openSide={openSide} setOpenSide={setOpenSide} />}
      </S_NAV>
    </>
  );
};

export default Nav;

const S_NAV = styled.nav`
  position: fixed;
  background: rgba(251, 251, 251, 0.8);
  color: #3b3b3b;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  z-index: 999;
  .toggler {
    display: flex;
    cursor: pointer;
    align-items: center;
    padding: 1rem;
  }
  .logo {
    padding: 1rem;
    cursor: pointer;
    img {
      height: 50px;
    }
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;
