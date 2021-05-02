import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { StyledCard } from '../../styles/cards';
const ChannelCard = ({ channel }) => {
  const { image, name } = channel;

  const history = useHistory();
  const { pathname } = history.location;

  const goToChannel = () => {
    history.push('/channels/' + channel.id);
  };

  return (
    <StyledCard onClick={goToChannel}>
      <div className='img'>
        {image ? <img src={image} alt={name} /> : <h3>{name}</h3>}
      </div>
      <p>{name}</p>
    </StyledCard>
  );
};

export default ChannelCard;
