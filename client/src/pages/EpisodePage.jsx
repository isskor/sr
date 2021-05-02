import React from 'react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEpisode,
  selectCurrentEpisode,
} from '../slices/programs/programsSlice';
import AddToFav from '../components/favorite/AddToFav';
import styled from 'styled-components';

import { StyledContainer } from '../styles/container';
import { setSource } from '../slices/player/playerSlice';
import { SSSBtnCtn, SSSInfo } from '../styles/content';
const EpisodePage = ({ match }) => {
  const dispatch = useDispatch();
  const episode = useSelector(selectCurrentEpisode);
  const { id } = match.params;

  useEffect(() => {
    dispatch(getEpisode(id));
  }, [dispatch]);

  if (!episode)
    return (
      <StyledContainer>
        <h1>Loading</h1>
      </StyledContainer>
    );

  const {
    title,
    description,
    imageurl,
    program,
    broadcasttime,
    url,
    listenpodfile,
    broadcast,
  } = episode.episode;

  const handlePlay = () => {
    // different object location for souce files
    dispatch(
      setSource(listenpodfile || { ...broadcast.broadcastfiles[0], title })
    );
  };
  return (
    <StyledContainer>
      <StyledEpisode>
        <div className='right'>
          <img src={imageurl} alt='' />
          <SSSBtnCtn>
            <AddToFav typeId={{ episodeId: id }} type={'favoriteEpisodes'} />
            <button onClick={handlePlay}>Play</button>
          </SSSBtnCtn>
        </div>
        <div className='left'>
          <h1>{title}</h1>
          <h3>program : {program.name}</h3>
          <h4>Broadcast Start: {broadcasttime.starttimeutc || 'n/a'}</h4>
          <h4>Broadcast End: {broadcasttime.endtimeutc || 'n/a'}</h4>
          <a href={url}>More info</a>
          <p className='desc'>{description}</p>
        </div>
      </StyledEpisode>
    </StyledContainer>
  );
};

export default EpisodePage;

const StyledEpisode = styled.div`
  padding: 1rem;
  margin-bottom: 3rem;

  a {
    color: black;
  }

  .desc {
    padding: 1rem 0;
  }
  img {
    width: 100%;
    max-width: 300px;
    display: block;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;
    gap: 2rem;
    background: rgba(255, 255, 255, 0.65);

    margin: 5rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 20px rgba(78, 78, 78, 0.3);
    padding: 5rem;
    .left {
      order: 1;
      flex: 40%;
    }
    .right {
      order: 2;
      flex: 40%;
    }
  }
`;
