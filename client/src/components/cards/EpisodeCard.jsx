import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const EpisodeCard = ({ episode }) => {
  const { title, description, imageurl, broadcasttime, id } = episode;
  const history = useHistory();
  const { starttimeutc, endtimeutc, endttimeutc } = broadcasttime;
  console.log(broadcasttime);
  const convertToDateObject = (SRTimeString) => {
    return new Date(
      parseInt(SRTimeString.replace(/[\/\(\)date]/gi, ''))
    ).toLocaleString();
  };
  return (
    <StyledEpisodeCard onClick={() => history.push('/episode/' + id)}>
      <h3>{title}</h3>
      <div className='top'>
        <img src={imageurl} alt='' />
        <div className='broadcast'>
          <p>Broadcast</p>
          <p>Start : {starttimeutc ? convertToDateObject(starttimeutc) : ''}</p>
          <p>
            End :{' '}
            {endtimeutc
              ? convertToDateObject(endtimeutc)
              : convertToDateObject(endttimeutc)}
          </p>
        </div>
      </div>
      <p>{description}</p>
    </StyledEpisodeCard>
  );
};

export default EpisodeCard;

const StyledEpisodeCard = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
  > h3 {
    padding-bottom: 1rem;
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    gap: 1rem;
    img {
      width: 120px;
    }
    p {
      padding-bottom: 0.25rem;
    }
  }
`;
