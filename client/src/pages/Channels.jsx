import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ChannelCard from '../components/cards/ChannelCard';

import {
  getChannels,
  selectChannels,
  selectChannelsStatus,
} from '../slices/channels/channelSlice';
import { StyledContainer } from '../styles/container';
import { SSSList } from '../styles/lists';
import { StyledH1 } from '../styles/typography';

const Channels = () => {
  const channels = useSelector(selectChannels);
  const status = useSelector(selectChannelsStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  return (
    <StyledContainer>
      {status === 'loading' ? (
        <h2>Loading</h2>
      ) : (
        <SSSList>
          <StyledH1>Channels</StyledH1>
          <ul>
            {channels.map((c) => (
              <li key={c.id}>
                <ChannelCard channel={c} />
              </li>
            ))}
          </ul>
        </SSSList>
      )}
    </StyledContainer>
  );
};

export default Channels;
