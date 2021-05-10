import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ChannelCard from '../components/cards/ChannelCard';
import EpisodeCard from '../components/cards/EpisodeCard';
import ProgramCard from '../components/cards/ProgramCard';
import {
  getFavorites,
  getUserSchedule,
  selectUserFavorites,
} from '../slices/user/userSlice';
import { StyledContainer } from '../styles/container';

const UserFavorites = ({ history, match }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectUserFavorites);
  useEffect(() => {
    dispatch(getFavorites());
    dispatch(getUserSchedule());
  }, []);

  let list = match.params.type;
  if (list !== 'channels' && list !== 'programs' && list !== 'episodes') {
    return (
      <Redirect
        to={{ pathname: '/favorite/channels', from: history.location }}
      />
    );
  }

  return (
    <StyledContainer>
      <h1>Favorites</h1>
      <StyledChannelNav className='channel_nav'>
        <StyledButton
          to='/favorite/channels'
          name='channels'
          active={match.params.type === 'channels' ? 'true' : ''}
        >
          Channels
        </StyledButton>
        <StyledButton
          to='/favorite/programs'
          name='programs'
          active={match.params.type === 'programs' ? 'true' : ''}
        >
          Programs
        </StyledButton>
        <StyledButton
          to='/favorite/episodes'
          name='episodes'
          active={match.params.type === 'episodes' ? 'true' : ''}
        >
          Episodes
        </StyledButton>
      </StyledChannelNav>
      <StyledFavList className='list'>
        {favorites &&
          favorites[list]?.map((fav) => {
            if (list === 'channels')
              return <ChannelCard channel={fav} key={fav.id} />;
            if (list === 'programs')
              return <ProgramCard program={fav} key={fav.id} />;
            if (list === 'episodes')
              return <EpisodeCard episode={fav} key={fav.id} />;
          })}
      </StyledFavList>
    </StyledContainer>
  );
};

export default UserFavorites;

const StyledChannelNav = styled.nav`
  display: flex;
  justify-content: space-between;
`;
const StyledButton = styled(Link)`
  display: inline-block;
  flex: 0.33;
  border-radius: 0.25rem;
  font-size: 1rem;
  padding: 1rem;
  text-decoration: none;
  text-align: center;
  color: black;
  background: ${(props) => (props.active ? '#c3fafb' : '#ffffff')} !important;
  box-shadow: 0 0 20px #c5c5c5;
`;
const StyledFavList = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 576px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
