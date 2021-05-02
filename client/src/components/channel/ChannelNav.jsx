import React from 'react';
import styled from 'styled-components';
const ChannelNav = ({ tabs, handleTabs }) => {
  return (
    <StyledChannelNav className='channel_nav'>
      <StyledButton name='info' active={tabs === 'info'} onClick={handleTabs}>
        Info
      </StyledButton>
      <StyledButton
        name='schedule'
        active={tabs === 'schedule'}
        onClick={handleTabs}
      >
        Schedule
      </StyledButton>
      <StyledButton
        name='programs'
        active={tabs === 'programs'}
        onClick={handleTabs}
      >
        Programs
      </StyledButton>
    </StyledChannelNav>
  );
};

export default ChannelNav;

const StyledChannelNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;
const StyledButton = styled.button`
  display: inline-block;
  flex: 0.33;
  border-radius: 0.25rem;
  font-size: 1rem;
  background: ${(props) =>
    props.active ? '' : 'rgba(255, 255, 255,0.8)'} !important;
  box-shadow: 0 0 50px #c5c5c5;
`;
